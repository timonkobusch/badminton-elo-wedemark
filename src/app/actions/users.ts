'use server';
import { IUser } from '@/lib/interfaces/IUser';
import { supabase } from '@/lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export async function createUser(username: string) {
    if (!username || username.trim() === '') {
        return { error: 'Bitte gib einen gültigen Namen ein.' };
    }
    const { error } = await supabase.from('users').insert({ name: username });
    if (error) {
        return { error: 'Fehler beim Erstellen des Benutzers' };
    }
    return { message: `Benutzer ${username} erfolgreich erstellt` };
}

export async function getUsers(): Promise<{ users: string[]; error?: string }> {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
        return { error: 'Fehler beim Abrufen der Benutzer', users: [] };
    }
    const names = (data ?? []).map((user) => user.name).filter((n): n is string => Boolean(n));

    return { users: names };
}
export async function getUsersAdmin(password: string): Promise<{ users: IUser[]; error?: string }> {
    if (password !== process.env.ADMIN_PASSWORD) {
        return { error: 'Ungültiges Admin-Passwort', users: [] };
    }
    const { data, error }: { data: IUser[] | null; error: PostgrestError | null } = await supabase.from('users').select('*');
    if (error) {
        return { error: 'Fehler beim Abrufen der Benutzer', users: [] };
    }

    return { users: data ? data : [], error: undefined };
}

export async function deleteUser(userId: number, userName: string, password: string) {
    if (password !== process.env.ADMIN_PASSWORD) {
        return { error: 'Ungültiges Admin-Passwort' };
    }
    const { error } = await supabase.from('users').delete().eq('id', userId);
    if (error) {
        return { error: 'Fehler beim Löschen des Benutzers' };
    }
    return { message: `Benutzer ${userName} erfolgreich gelöscht` };
}
