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

    const newGame: Omit<IGame, 'id' | 'created_at'> = {
        teamSize: data.teamSize,
        gamesCount: data.gamesCount,
        matchResult: data.matchResult,
        playersTeamOne: data.players.team1,
        playersTeamTwo: data.players.team2,
    };

    const { error } = await supabase.from('games').insert(newGame);

    if (error) {
        console.error('Fehler beim Insert:', error);
        return { error: 'Fehler beim Speichern des Spiels.' };
    }

    return { message: 'Spiel erfolgreich gespeichert.' };
}

export async function getGames() {
    const { data, error }: { data: IGame[] | null; error: PostgrestError | null } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

    if (error) {
        return { games: [], error: 'Fehler beim Laden der Spiele.' };
    }
    return { games: data || [], error: null };
}

export async function deleteGame(gameId: number) {
    const { error } = await supabase.from('games').delete().eq('id', gameId);
    if (error) {
        return { error: 'Fehler beim Löschen des Spiels.' };
    }

    return { message: 'Spiel erfolgreich gelöscht.' };
}
