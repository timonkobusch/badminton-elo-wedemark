'use client';
import { IGame } from '@/lib/interfaces/IGame';

const RankingTable = ({ games }: { games: IGame[] }) => {
    const playerStats: Record<string, { wins: number; losses: number }> = {};
    games.forEach((game) => {
        const { matchResult, playersTeamOne, playersTeamTwo } = game;

        const teamOneWon = matchResult === '1-0' || matchResult === '2-0' || matchResult === '2-1';
        const teamTwoWon = matchResult === '0-1' || matchResult === '0-2' || matchResult === '1-2';

        // Team 1 Spieler
        playersTeamOne.forEach((player) => {
            if (!playerStats[player]) playerStats[player] = { wins: 0, losses: 0 };
            if (teamOneWon) playerStats[player].wins++;
            else if (teamTwoWon) playerStats[player].losses++;
        });

        // Team 2 Spieler
        playersTeamTwo.forEach((player) => {
            if (!playerStats[player]) playerStats[player] = { wins: 0, losses: 0 };
            if (teamTwoWon) playerStats[player].wins++;
            else if (teamOneWon) playerStats[player].losses++;
        });
    });
    const rankings = Object.entries(playerStats)
        .map(([name, stats]) => ({
            name,
            wins: stats.wins,
            losses: stats.losses,
            gamesPlayed: stats.wins + stats.losses,
            winRate: stats.wins + stats.losses > 0 ? (stats.wins / (stats.wins + stats.losses)) * 100 : 0,
            elo: 1500, // statisch
        }))
        .sort((a, b) => b.winRate - a.winRate);

    // 🧾 Falls noch keine Spiele vorhanden sind
    if (!games.length) {
        return <div className="bg-white rounded-lg shadow-md p-6 text-gray-500 text-sm text-center">Noch keine Spiele vorhanden.</div>;
    }
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Rangliste</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rang</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spieler</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ELO</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S-N</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {rankings.map((player, index) => (
                            <tr key={player.name} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                                            index === 0 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        {index + 1}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.name}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{player.elo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {player.wins}-{player.losses} ({player.winRate.toFixed(0)}%)
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RankingTable;
