// components/RecentGames.jsx
import React from 'react';

const RecentGames = () => {
    const recentGames = [
        { id: 1, player1: 'John Doe', player2: 'Jane Smith', score: '21-19, 21-18', winner: 'John Doe', date: '28.10.25' },
        { id: 2, player1: 'Mike Johnson', player2: 'Sarah Wilson', score: '21-17, 19-21, 21-16', winner: 'Mike Johnson', date: '29.10.25' },
    ];

    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Recent Games</h2>
            </div>
            <div className="divide-y divide-gray-200">
                {recentGames.map((game) => (
                    <div key={game.id} className="px-6 py-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-medium bg-green-100 text-green-800 px-2 rounded-l">{game.player1}</span>
                            <span className="text-sm text-gray-500">vs</span>
                            <span className="font-medium bg-red-100 text-red-800 px-2 rounded-l">{game.player2}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600 px-2">
                            <span className="font-mono">{game.score}</span>
                            <span className="text-gray-500">{game.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentGames;
