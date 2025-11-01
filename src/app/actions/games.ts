'use server';
import { gameSchema } from '@/lib/definitions';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { IGame } from '@/lib/interfaces/IGame';
import { PostgrestError } from '@supabase/supabase-js';

export async function insertGame(formData: z.infer<typeof gameSchema>) {
    const parsed = gameSchema.safeParse(formData);
    if (!parsed.success) {
        return { error: `Ungültige Eingabe.` };
    }

    const data = parsed.data;

    const scoreTeam1 = data.matchResult.split('-')[0];
    const scoreTeam2 = data.matchResult.split('-')[1];

    const newGame: Omit<IGame, 'id' | 'created_at'> = {
        team_size: data.teamSize,
        team_one_players: data.players.team1,
        team_two_players: data.players.team2,
        team_one_score: parseInt(scoreTeam1),
        team_two_score: parseInt(scoreTeam2),
        game_count: data.gamesCount,
        winner_team: parseInt(scoreTeam1) > parseInt(scoreTeam2) ? 'team_one' : 'team_two',
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

    return { data: result, message: 'Spiel erfolgreich gespeichert.' };
}

export async function getGames() {
    const { data, error }: { data: IGame[] | null; error: PostgrestError | null } = await supabase
        .from('games')
        .select('*')
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
    // moving game to games_deleted
    const { data: game, error: fetchError } = await supabase.from('games').select('*').eq('id', gameId).single();

    if (fetchError || !game) {
        return { error: 'Spiel konnte nicht gefunden werden.' };
    }

    const { error: insertError } = await supabase.from('games_deleted').insert([{ ...game }]);

    if (insertError) {
        console.log(insertError);
        return { error: 'Fehler beim Verschieben in games_deleted.' };
    }

    const { error: deleteError } = await supabase.from('games').delete().eq('id', gameId);

    if (deleteError) {
        return { error: 'Fehler beim Löschen des Spiels.' };
    }

    return { message: 'Spiel erfolgreich gelöscht und archiviert.' };
}
