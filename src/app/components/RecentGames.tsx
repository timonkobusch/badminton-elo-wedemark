'use client';
import { IGame } from '@/lib/interfaces/IGame';
import { deleteGame } from '@/app/actions/games';
import { useState, Fragment } from 'react';

const RecentGames = ({ games }: { games: IGame[] }) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    if (!games?.length) {
        return <div className="bg-white rounded-lg shadow-md p-6 text-gray-500 text-sm text-center">Keine Spiele vorhanden</div>;
    }
    const handleDelete = async (gameId: number) => {
        const confirmation = confirm('Möchten Sie dieses Spiel wirklich löschen?');
        if (!confirmation) return;
        setLoading(true);
        const { error } = await deleteGame(gameId);
        if (error) {
            setError(error);
            setLoading(false);
        } else {
            // Seite neu laden, um die Änderungen anzuzeigen
            setLoading(false);
            window.location.reload();
        }
    };
    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Letzte Spiele</h2>
            </div>

            <div className="divide-y divide-gray-200">
                {games.map((game) => (
                    <Fragment key={game.id}>
                        {!loading && (
                            <div className="px-6 py-4">
                                {error && <div className="text-red-500 mb-2">{error}</div>}
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex-1 text-left">
                                        <span className="font-medium bg-green-100 text-green-800 px-2 py-1 rounded-lg">
                                            {game.playersTeamOne.join(' & ')}
                                        </span>
                                    </div>

                                    <span className="text-sm text-gray-500 mx-2">vs</span>

                                    <div className="flex-1 text-right">
                                        <span className="font-medium bg-red-100 text-red-800 px-2 py-1 rounded-lg">
                                            {game.playersTeamTwo.join(' & ')}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-600 mt-1 px-1">
                                    <button className="flex-1 text-primary m-0 text-left" onClick={() => handleDelete(game.id)}>
                                        Löschen
                                    </button>

                                    <span className="flex-1 text-center font-mono text-gray-800 font-bold">{game.matchResult}</span>

                                    <span className="flex-1 text-right text-gray-500">{new Date(game.created_at).toLocaleDateString('de-DE')}</span>
                                </div>
                            </div>
                        )}

                        {loading && <div className="px-6 py-4 text-center text-gray-500">Löschen...</div>}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default RecentGames;
