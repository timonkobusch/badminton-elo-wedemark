'use server';
import { supabase } from '@/lib/supabase';

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
