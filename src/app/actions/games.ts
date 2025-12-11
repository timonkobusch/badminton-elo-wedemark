'use server';
import { gameSchema } from '@/lib/definitions';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { IGame } from '@/lib/interfaces/IGame';
import { PostgrestError } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

export async function insertGame(formData: z.infer<typeof gameSchema>) {
    const parsed = gameSchema.safeParse(formData);
    if (!parsed.success) {
        return { error: `Ungültige Eingabe.` };
    }
    // get latest season id by season.started_at
    const { data: seasons, error: seasonError } = await supabase
        .from('seasons')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(1)
        .single();

    if (seasonError || !seasons) {
        return { error: 'Fehler beim Abrufen der Saison.' };
    }

    const data = parsed.data;

    const scoreTeam1 = data.matchResult.split('-')[0];
    const scoreTeam2 = data.matchResult.split('-')[1];

    const newGame: Omit<IGame, 'id' | 'created_at' | 'deleted_at'> = {
        team_size: data.teamSize,
        team_one_players: data.players.team1,
        team_two_players: data.players.team2,
        team_one_score: parseInt(scoreTeam1),
        team_two_score: parseInt(scoreTeam2),
        game_count: data.gamesCount,
        winner_team: parseInt(scoreTeam1) > parseInt(scoreTeam2) ? 'team_one' : 'team_two',
        season_id: seasons.id,
    };

    const { data: result, error }: { data: IGame | null; error: PostgrestError | null } = await supabase
        .from('games')
        .insert(newGame)
        .select()
        .single();

    if (error || !result) {
        console.error('Fehler beim Insert:', error);
        return { error: 'Fehler beim Speichern des Spiels.' };
    }
    revalidatePath('/');
    return { data: result, message: 'Spiel erfolgreich gespeichert.' };
}

export async function getGames() {
    const { data: seasons, error: seasonError } = await supabase
        .from('seasons')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(1)
        .single();

    if (seasonError || !seasons) {
        return { games: [], error: 'Fehler beim Laden der Spiele.' };
    }

    const { data, error }: { data: IGame[] | null; error: PostgrestError | null } = await supabase
        .from('games')
        .select('*')
        .is('deleted_at', null)
        .eq('season_id', seasons.id)
        .order('created_at', { ascending: false });

    if (error) {
        return { games: [], error: 'Fehler beim Laden der Spiele.' };
    }

    if (!data) {
        return { games: [], error: null };
    }

    return { games: data || [], error: null };
}

export async function softDeleteGame(gameId: number) {
    // mark game as deleted by setting deleted_at
    const { data: game, error: fetchError } = await supabase.from('games').select('*').eq('id', gameId).single();

    if (fetchError || !game) {
        return { error: 'Spiel konnte nicht gefunden werden.' };
    }

    const { error: updateError } = await supabase.from('games').update({ deleted_at: new Date() }).eq('id', gameId);

    if (updateError) {
        console.log(updateError);
        return { error: 'Fehler beim Verschieben in games_deleted.' };
    }
    revalidatePath('/');
    return { message: 'Spiel erfolgreich gelöscht und archiviert.' };
}

export async function getDeletedGames(password: string) {
    if (password !== process.env.ADMIN_PASSWORD) {
        return { games: [], error: 'Ungültiges Admin-Passwort' };
    }
    const { data, error }: { data: IGame[] | null; error: PostgrestError | null } = await supabase
        .from('games')
        .select('*')
        .not('deleted_at', 'is', null)
        .order('deleted_at', { ascending: false });
    if (error) {
        return { games: [], error: 'Fehler beim Laden der gelöschten Spiele.' };
    }
    return { games: data || [], error: null };
}

export async function restoreDeletedGame(gameId: number, password: string) {
    if (password !== process.env.ADMIN_PASSWORD) {
        return { error: 'Ungültiges Admin-Passwort' };
    }
    const { data: game, error: fetchError } = await supabase.from('games').select('*').eq('id', gameId).single();
    if (fetchError || !game) {
        return { error: 'Spiel konnte nicht gefunden werden.' };
    }
    const { error: updateError } = await supabase.from('games').update({ deleted_at: null }).eq('id', gameId);
    if (updateError) {
        console.log(updateError);
        return { error: 'Fehler beim Wiederherstellen des Spiels.' };
    }
    return { message: `Spiel ${gameId} erfolgreich wiederhergestellt.` };
}
export async function hardDeleteGame(gameId: number, password: string) {
    if (password !== process.env.ADMIN_PASSWORD) {
        return { error: 'Ungültiges Admin-Passwort' };
    }
    const { data: game, error: fetchError } = await supabase.from('games').select('*').eq('id', gameId).single();
    if (fetchError || !game) {
        return { error: 'Spiel konnte nicht gefunden werden.' };
    }
    const { error: deleteError } = await supabase.from('games').delete().eq('id', gameId);
    if (deleteError) {
        console.log(deleteError);
        return { error: 'Fehler beim endgültigen Löschen des Spiels.' };
    }
    return { message: `Spiel ${gameId} erfolgreich gelöscht.` };
}
