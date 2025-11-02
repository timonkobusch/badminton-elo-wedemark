'use client';
import { AnimatePresence, motion } from 'motion/react';
import { softDeleteGame } from '@/app/actions/games';
import { useState } from 'react';
import { useGamesStore } from '@/stores/useGamesStore';
import { IGame } from '@/lib/interfaces/IGame';

const RecentGames = () => {
    const { games, removeGame } = useGamesStore();
    const [error, setError] = useState<string | null>(null);
    const [openGameId, setOpenGameId] = useState<number | null>(null);
    const [openGameday, setOpenGameday] = useState<{ initialOpen: boolean; openId: string | null }>({ initialOpen: true, openId: null });

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
            removeGame(gameId);
        }
    };

    const sortedGames = games.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const groupedGames = Object.groupBy(sortedGames, (game) => {
        const date = new Date(game.created_at);
        return date.toDateString();
    });

    const groupedGamesArray = Object.entries(groupedGames).map(([date, games]) => ({ date, games: games as IGame[] }));

    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="px-4 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 inline pr-2">Spiele</h2>
                {error && <div className="text-red-500 mb-2">{error}</div>}
            </div>
            <div className="divide-y divide-gray-200">
                {groupedGamesArray.map(({ date, games }, index) => {
                    const isGameDayOpen = date == openGameday.openId ? true : openGameday.initialOpen && index === 0;

                    return (
                        <div key={date}>
                            <div
                                className="text-gray-700 py-2 text-l font-semibold  px-4 cursor-pointer"
                                onClick={() =>
                                    setOpenGameday(isGameDayOpen ? { initialOpen: false, openId: null } : { initialOpen: false, openId: date })
                                }
                            >
                                {new Date(games[0].created_at).toLocaleDateString('de-DE', {
                                    weekday: 'long',
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: '2-digit',
                                })}
                            </div>
                            <AnimatePresence>
                                {isGameDayOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        {games.map((game) => {
                                            const isOpen = openGameId === game.id;
                                            game.team_one_players.sort();
                                            game.team_two_players.sort();
                                            return (
                                                <div
                                                    key={game.id}
                                                    className="cursor-pointer odd:bg-gray-100 text-gray-700 rounded px-4"
                                                    onClick={() => setOpenGameId(isOpen ? null : game.id)}
                                                >
                                                    <div className="pb-1 pt-2">
                                                        <div className=" text-sm pb-1">
                                                            {new Date(game.created_at).toLocaleTimeString('de-DE', {
                                                                timeZone: 'Europe/Berlin',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}{' '}
                                                            Uhr
                                                        </div>
                                                        <div className="flex justify-between items-center mb-4">
                                                            <div className="flex-1 text-left">
                                                                {game.winner_team === 'team_one' ? (
                                                                    <span className="font-medium text-green-700 py-1">
                                                                        {game.team_one_players.join(' & ')}
                                                                    </span>
                                                                ) : (
                                                                    <span className="font-medium text-red-800 py-1">
                                                                        {game.team_one_players.join(' & ')}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="text-md text-gray-700 mx-2 font-semibold">
                                                                {game.team_one_score} : {game.team_two_score}
                                                            </span>

                                                            <div className="flex-1 text-right">
                                                                {game.winner_team === 'team_two' ? (
                                                                    <span className="font-medium text-green-700 py-1">
                                                                        {game.team_two_players.join(' & ')}
                                                                    </span>
                                                                ) : (
                                                                    <span className="font-medium text-red-800 py-1">
                                                                        {game.team_two_players.join(' & ')}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <AnimatePresence>
                                                        {isOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.25 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="mb-4 flex justify-between items-end">
                                                                    <div>
                                                                        <div>
                                                                            Brian: <span>+15</span>
                                                                        </div>
                                                                        <div>
                                                                            Timon: <span>+17</span>
                                                                        </div>
                                                                        <div>
                                                                            Simon: <span>-13</span>
                                                                        </div>
                                                                        <div>
                                                                            Jason: <span>-16</span>
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleDelete(game.id);
                                                                        }}
                                                                        className="text-red-600 hover:text-red-800 text-sm"
                                                                    >
                                                                        Spiel löschen
                                                                    </button>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentGames;
