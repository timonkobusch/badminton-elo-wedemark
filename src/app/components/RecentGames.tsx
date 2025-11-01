'use client';
import { softDeleteGame } from '@/app/actions/games';
import { useState } from 'react';
import { useGamesStore } from '@/stores/useGamesStore';

const RecentGames = () => {
    const { games, removeGame } = useGamesStore();
    const [error, setError] = useState<string | null>(null);

    if (!games?.length) {
        return <div className="bg-white rounded-lg shadow-md p-6 text-gray-500 text-sm text-center">Keine Spiele vorhanden</div>;
    }

    const handleDelete = async (gameId: number) => {
        const confirmation = confirm('Möchten Sie dieses Spiel wirklich löschen?');
        if (!confirmation) return;

        const { error } = await softDeleteGame(gameId);

        if (error) {
            setError(error);
        } else {
            // Delete from grouped Games
            removeGame(gameId);
        }
    };

    function groupByStrict<T>(array: readonly T[], keyFn: (item: T) => string): Record<string, T[]> {
        return Object.groupBy(array, keyFn) as Record<string, T[]>;
    }

    const grouped = groupByStrict(games, (game) => new Date(game.created_at).toISOString().split('T')[0]);

    const groupedGames = Object.entries(grouped)
        .sort(([a], [b]) => (a < b ? 1 : -1))
        .map(([date, games]) => ({ date, games }));

    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 inline pr-2">Spiele</h2>
                <span className="text-gray-500 text-sm">Auf ein Spiel drücken, um es zu löschen</span>
                {error && <div className="text-red-500 mb-2">{error}</div>}
            </div>

            <div className="divide-y divide-gray-200">
                {groupedGames.map(({ date, games }) => (
                    <div key={date}>
                        <div className="px-6 text-gray-500 pt-2 text-l">
                            {new Date(games[0].created_at).toLocaleDateString('de-DE', {
                                weekday: 'long',
                                day: 'numeric',
                                month: '2-digit',
                                year: '2-digit',
                            })}
                        </div>
                        {games.map((game) => (
                            <div key={game.id} className="cursor-pointer" onClick={() => handleDelete(game.id)}>
                                <div className="px-6 py-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex-1 text-left">
                                            {game.winner_team === 'team_one' ? (
                                                <span className="font-medium border-green bg-green-100 border text-green-800 px-2 py-1 rounded-lg">
                                                    {game.team_one_players.join(' & ')}
                                                </span>
                                            ) : (
                                                <span className="font-normal border border-red text-red-800 px-2 py-1 rounded-lg">
                                                    {game.team_one_players.join(' & ')}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-md text-gray-700 mx-2">
                                            {game.team_one_score} : {game.team_two_score}
                                        </span>

                                        <div className="flex-1 text-right">
                                            {game.winner_team === 'team_two' ? (
                                                <span className="font-medium border-green bg-green-100 border text-green-800 px-2 py-1 rounded-lg">
                                                    {game.team_two_players.join(' & ')}
                                                </span>
                                            ) : (
                                                <span className="font-normal border border-red text-red-800 px-2 py-1 rounded-lg">
                                                    {game.team_two_players.join(' & ')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentGames;
