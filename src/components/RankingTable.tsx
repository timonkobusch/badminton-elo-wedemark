// components/RankingTable.jsx
import React from 'react';

const RankingTable = () => {
    // Mock data
    const rankings = [
        { id: 1, name: 'Brian', elo: 1560, gamesPlayed: 45, wins: 28, losses: 17 },
        { id: 2, name: 'Timon', elo: 1520, gamesPlayed: 38, wins: 25, losses: 13 },
        { id: 3, name: 'Simon', elo: 1480, gamesPlayed: 52, wins: 30, losses: 22 },
        { id: 4, name: 'Nora', elo: 1450, gamesPlayed: 41, wins: 22, losses: 19 },
    ];

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Rangliste</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rang</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spieler</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ELO</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S-N</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rankings.map((player, index) => (
                            <tr key={player.id} className="hover:bg-gray-50">
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{player.elo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {player.wins}-{player.losses} ({player.wins + player.losses})
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
