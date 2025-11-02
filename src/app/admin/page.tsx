'use client';
import { checkAdminPassword } from '@/app/actions/admin';
import { getDeletedGames, hardDeleteGame, restoreDeletedGame } from '@/app/actions/games';
import { getUsersAdmin, deleteUser } from '@/app/actions/users';
import { IGame } from '@/lib/interfaces/IGame';
import { IUser } from '@/lib/interfaces/IUser';
import { useState } from 'react';

const AdminPage = () => {
    const [password, setPassword] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<IUser[]>([]);
    const [games, setGames] = useState<IGame[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        const success = await checkAdminPassword(password);

        if (success) {
            setIsAuthorized(true);
            // Lade Daten nach erfolgreicher Authentifizierung
            const { users, error: usersError } = await getUsersAdmin(password);
            const { games, error: gamesError } = await getDeletedGames(password);
            if (usersError || gamesError) {
                setError(usersError || gamesError);
            } else {
                setUsers(users);
                setGames(games);
            }
        } else {
            setError('Falsches Passwort');
        }

        setLoading(false);
    };

    const handleDeleteUser = async (userId: number, userName: string) => {
        const confirmation = confirm(`Möchten Sie den Benutzer ${userName} wirklich löschen?`);
        if (!confirmation) return;
        const { message, error: deleteError } = await deleteUser(userId, userName, password);
        if (deleteError) {
            setError(deleteError);
            return;
        }
        setMessage(message || 'Benutzer gelöscht.');
        setUsers(users.filter((user) => user.id !== userId));
    };
    const handleDeleteGame = async (gameId: number) => {
        const confirmation = confirm(`Möchten Sie Spiel ${gameId} wirklich endgültig löschen?`);
        if (!confirmation) return;
        const { message, error: deleteError } = await hardDeleteGame(gameId, password);
        if (deleteError) {
            setError(deleteError);
            return;
        }
        setMessage(message || 'Spiel gelöscht.');
        setGames(games.filter((game) => game.id !== gameId));
    };
    const handleRestoreGame = async (gameId: number) => {
        const confirmation = confirm(`Möchten Sie Spiel ${gameId} wirklich wiederherstellen?`);
        if (!confirmation) return;
        const { message, error: restoreError } = await restoreDeletedGame(gameId, password);
        if (restoreError) {
            setError(restoreError);
            return;
        }
        setMessage(message || 'Spiel wiederhergestellt.');
        games.filter((game) => game.id !== gameId);
    };

    if (!isAuthorized) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-700 text-white">
                <div className="p-6 bg-neutral-800 rounded-lg shadow-lg">
                    <h1 className="text-2xl mb-4">Admin Login</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-3 py-2 text-black rounded mb-2 bg-white"
                        placeholder="Admin Passwort"
                    />
                    <button onClick={handleLogin} disabled={loading} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                        {loading ? 'Überprüfe...' : 'Login'}
                    </button>
                    {error && <p className="text-red-400 mt-2">{error}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-neutral-800 text-white overflow-hidden min-h-screen">
            <h1 className="text-3xl p-4">Admin Dashboard</h1>
            {message && <p className="text-green-400 pl-4">{message}</p>}
            {error && <p className="text-red-400 pl-4">{error}</p>}
            <div className="p-4 bg-neutral-700 rounded-xl m-4">
                <h2 className="text-xl mb-2">Benutzerliste:</h2>
                <table className="table-auto w-full border border-neutral-600 text-left">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Erstellt am</th>
                            <th>Ändern</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>
                                    {new Date(user.created_at).toLocaleDateString('de-DE', {
                                        weekday: 'long',
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: '2-digit',
                                    })}
                                    {' - '}
                                    {new Date(user.created_at).toLocaleTimeString('de-DE', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}{' '}
                                    Uhr
                                </td>
                                <td>
                                    <button className="bg-red-600 px-2 py-1 my-1 rounded-lg" onClick={() => handleDeleteUser(user.id, user.name)}>
                                        Löschen
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-neutral-700 rounded-xl m-4">
                <h2 className="text-xl mb-2">Gelöschte Spiele:</h2>
                <table className="table-auto w-full border border-neutral-600 text-left">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Erstellt am</th>
                            <th>Gelöscht am</th>
                            <th>Team 1 Spieler</th>
                            <th>Team 2 Spieler</th>
                            <th>Ergebnis</th>
                            <th>Ändern</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game) => (
                            <tr key={game.id}>
                                <td>{game.id}</td>
                                <td>{new Date(game.created_at).toLocaleDateString()}</td>
                                <td>{game.deleted_at ? new Date(game.deleted_at).toLocaleDateString() : 'N/A'}</td>
                                <td>{game.team_one_players.join(' & ')}</td>
                                <td>{game.team_two_players.join(' & ')}</td>
                                <td>
                                    {game.team_one_score} - {game.team_two_score}
                                </td>
                                <td>
                                    <button className="bg-green-600 px-2 py-1 rounded-lg my-1" onClick={() => handleRestoreGame(game.id)}>
                                        Wiederherstellen
                                    </button>
                                    <button className="bg-red-600 px-2 py-1 rounded-lg ml-2" onClick={() => handleDeleteGame(game.id)}>
                                        Löschen
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
