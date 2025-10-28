// components/GameInput.jsx
'use client';
import React, { useState } from 'react';

const GameInput = () => {
    const [teamSize, setTeamSize] = useState('single');
    const [gamesCount, setGamesCount] = useState(3);
    const [matchResult, setMatchResult] = useState('2-0');

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Input Game Result</h2>

            <div className="mb-6">
                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={() => setTeamSize('single')}
                        className={`px-4 py-2 rounded-lg font-medium ${
                            teamSize === 'single' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Singles
                    </button>
                    <button
                        onClick={() => setTeamSize('double')}
                        className={`px-4 py-2 rounded-lg font-medium ${
                            teamSize === 'double' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Doubles
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-3">{teamSize === 'single' ? 'Player 1' : 'Team 1'}</h3>
                        <div className="space-y-3">
                            {teamSize === 'double' && (
                                <>
                                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                        <option>Select Player</option>
                                        <option>John Doe</option>
                                        <option>Jane Smith</option>
                                    </select>
                                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                        <option>Select Player</option>
                                        <option>Mike Johnson</option>
                                        <option>Sarah Wilson</option>
                                    </select>
                                </>
                            )}
                            {teamSize === 'single' && (
                                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                    <option>Select Player</option>
                                    <option>John Doe</option>
                                    <option>Jane Smith</option>
                                    <option>Mike Johnson</option>
                                    <option>Sarah Wilson</option>
                                </select>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-700 mb-3">{teamSize === 'single' ? 'Player 2' : 'Team 2'}</h3>
                        <div className="space-y-3">
                            {teamSize === 'double' && (
                                <>
                                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                        <option>Select Player</option>
                                        <option>Chris Brown</option>
                                        <option>Emily Davis</option>
                                    </select>
                                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                        <option>Select Player</option>
                                        <option>David Lee</option>
                                        <option>Lisa Wang</option>
                                    </select>
                                </>
                            )}
                            {teamSize === 'single' && (
                                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                                    <option>Select Player</option>
                                    <option>Chris Brown</option>
                                    <option>Emily Davis</option>
                                    <option>David Lee</option>
                                    <option>Lisa Wang</option>
                                </select>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={() => setGamesCount(1)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                            gamesCount === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Best of 1
                    </button>
                    <button
                        onClick={() => setGamesCount(3)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                            gamesCount === 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Best of 3
                    </button>
                    <button
                        onClick={() => setGamesCount(5)}
                        className={`px-3 py-2 rounded-lg font-medium ${
                            gamesCount === 5 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Best of 5
                    </button>
                </div>

                <div className="flex space-x-0 mb-4">
                    <button
                        onClick={() => setMatchResult('2-0')}
                        className={`px-4 py-2  font-medium flex-auto ${
                            matchResult === '2-0' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        2 - 0
                    </button>
                    <button
                        onClick={() => setMatchResult('2-1')}
                        className={`px-4 py-2 font-medium flex-auto ${
                            matchResult === '2-1' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        2 - 1
                    </button>
                    <button
                        onClick={() => setMatchResult('1-2')}
                        className={`px-3 py-2 font-medium flex-auto ${
                            matchResult === '1-2' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        1 - 2
                    </button>
                </div>

                <button className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                    Submit Game Result
                </button>
            </div>
        </div>
    );
};

export default GameInput;
