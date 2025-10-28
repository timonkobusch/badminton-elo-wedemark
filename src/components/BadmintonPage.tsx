// components/BadmintonPage.jsx
'use client';
import { useState } from 'react';
import RankingTable from './RankingTable';
import GameInput from './GameInput';
import RecentGames from './RecentGames';
import Undo from './Undo';

const BadmintonPage = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">B</span>
                            </div>
                            <h1 className="ml-3 text-2xl font-bold text-gray-900">Badminton Rangliste</h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div>
                        <Undo />
                    </div>
                    <div>
                        <GameInput />
                    </div>
                    <div className="lg:col-span-2">
                        <RankingTable />
                    </div>
                    <div>
                        <RecentGames />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BadmintonPage;
