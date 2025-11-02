'use client';

import { useState, SetStateAction } from 'react';
import { createUser } from '@/app/actions/users';

const AddPlayerForm = ({
    openAddPlayerModal,
    setOpenAddPlayerModal,
}: {
    openAddPlayerModal: boolean;
    setOpenAddPlayerModal: (value: SetStateAction<boolean>) => void;
}) => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleAdd = async () => {
        setError(null);
        setSuccess(null);

        if (!username.trim()) {
            setError('Bitte gib einen Spielernamen ein.');
            return;
        }

        setLoading(true);
        const result = await createUser(username);
        setLoading(false);

        if (result?.error) {
            setError(result.error);
        } else {
            setSuccess(result.message || 'Spieler erfolgreich hinzugefügt!');
            setUsername('');
            setOpenAddPlayerModal(false);
        }
    };

    if (!openAddPlayerModal) return null;

    return (
        <>
            <hr className="my-2 text-gray-400" />
            <div className="bg-white rounded-lg p-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Spielername"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-2"
                />

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

                <div className="flex w-full justify-between space-x-2">
                    <button
                        onClick={() => setOpenAddPlayerModal(false)}
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 flex-1"
                        disabled={loading}
                    >
                        Abbrechen
                    </button>
                    <button
                        onClick={handleAdd}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-90 transition-colors flex-2 disabled:opacity-50"
                    >
                        {loading ? 'Wird hinzugefügt...' : 'Hinzufügen'}
                    </button>
                </div>
            </div>
            <hr className="my-2 text-gray-400" />
        </>
    );
};

export default AddPlayerForm;
