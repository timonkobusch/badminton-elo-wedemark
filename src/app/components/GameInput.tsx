// components/GameInput.jsx
'use client';
import AddPlayerForm from './AddPlayerForm';
import { useEffect, useState, useTransition } from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gameSchema } from '@/lib/definitions';
import { insertGame } from '@/app/actions/games';

export type GameForm = z.infer<typeof gameSchema>;

const GameInput = ({ users }: { users: string[] }) => {
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset,
    } = useForm<GameForm>({
        resolver: zodResolver(gameSchema),
        mode: 'onSubmit',
        defaultValues: {
            teamSize: 1,
            gamesCount: 3,
            matchResult: '2-0',
            players: { team1: [], team2: [] },
        },
    });

    const [openAddPlayerModal, setOpenAddPlayerModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    // eslint-disable-next-line react-hooks/incompatible-library
    const teamSize = watch('teamSize');
    const gamesCount = watch('gamesCount');

    const onSubmit = (data: GameForm) => {
        setError(null);
        setSuccess(null);

        startTransition(async () => {
            const result = await insertGame(data);

            if (result?.error) {
                setError(result.error);
            } else {
                setSuccess(result.message || 'Spiel erfolgreich eingetragen.');

                reset();
                window.location.reload();
            }
        });
    };
    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)();
            }}
            className="bg-white rounded-lg shadow-md p-6"
        >
            <div className="flex w-full justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Spiel eintragen</h2>
                <button
                    onClick={() => setOpenAddPlayerModal(true)}
                    className="bg-primary text-white py-1 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                >
                    Neuer Spieler
                </button>
            </div>

            <AddPlayerForm openAddPlayerModal={openAddPlayerModal} setOpenAddPlayerModal={setOpenAddPlayerModal} />

            <Controller
                control={control}
                name="teamSize"
                render={({ field }) => (
                    <div className="flex space-x-4 mb-4">
                        {[1, 2].map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => field.onChange(option)}
                                className={`px-4 py-2 rounded-lg font-medium ${
                                    field.value === option ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {option === 1 ? 'Einzel' : 'Doppel'}
                            </button>
                        ))}
                    </div>
                )}
            />
            {errors.players?.team1?.message && <p className="text-red-500 text-sm mt-1">{errors.players.team1.message}</p>}
            {errors.players?.team2?.message && <p className="text-red-500 text-sm mt-1">{errors.players.team2.message}</p>}
            {errors.players?.team1?.[0]?.message && <p className="text-red-500 text-sm mt-1">{errors.players.team1[0].message}</p>}
            {errors.players?.team2?.[0]?.message && <p className="text-red-500 text-sm mt-1">{errors.players.team2[0].message}</p>}
            {errors.players?.message && <p className="text-red-500 text-sm mt-2">{errors.players.message}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Team 1 */}
                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">{teamSize === 1 ? 'Spieler 1' : 'Team 1'}</h3>
                    <div className="space-y-3">
                        {teamSize === 1 ? (
                            <Controller
                                control={control}
                                name="players.team1"
                                render={({ field }) => (
                                    <select
                                        value={field.value?.[0] ?? ''}
                                        onChange={(e) => {
                                            const newVal = [...(field.value ?? [])];
                                            newVal[0] = e.target.value;
                                            field.onChange(newVal);
                                        }}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="">Auswählen</option>
                                        {users.map((p) => (
                                            <option key={p} value={p}>
                                                {p}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        ) : (
                            <>
                                <Controller
                                    control={control}
                                    name="players.team1"
                                    render={({ field }) => (
                                        <>
                                            <select
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                value={field.value[0] || ''}
                                                onChange={(e) => {
                                                    const newVal = [...(field.value || [])];
                                                    newVal[0] = e.target.value;
                                                    field.onChange(newVal);
                                                }}
                                            >
                                                <option value="">Auswählen</option>
                                                {users.map((p) => (
                                                    <option key={p} value={p}>
                                                        {p}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                value={field.value[1] || ''}
                                                onChange={(e) => {
                                                    const newVal = [...(field.value || [])];
                                                    newVal[1] = e.target.value;
                                                    field.onChange(newVal);
                                                }}
                                            >
                                                <option value="">Auswählen</option>
                                                {users.map((p) => (
                                                    <option key={p} value={p}>
                                                        {p}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    )}
                                />
                            </>
                        )}
                    </div>
                </div>

                {/* Team 2 */}
                <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">{teamSize === 1 ? 'Spieler 2' : 'Team 2'}</h3>
                    <div className="space-y-3">
                        {teamSize === 1 ? (
                            <Controller
                                control={control}
                                name="players.team2"
                                render={({ field }) => (
                                    <select
                                        value={field.value?.[0] ?? ''}
                                        onChange={(e) => {
                                            const newVal = [...(field.value ?? [])];
                                            newVal[0] = e.target.value;
                                            field.onChange(newVal);
                                        }}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="">Auswählen</option>
                                        {users.map((p) => (
                                            <option key={p} value={p}>
                                                {p}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        ) : (
                            <>
                                <Controller
                                    control={control}
                                    name="players.team2"
                                    render={({ field }) => (
                                        <>
                                            <select
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                value={field.value[0] || ''}
                                                onChange={(e) => {
                                                    const newVal = [...(field.value || [])];
                                                    newVal[0] = e.target.value;
                                                    field.onChange(newVal);
                                                }}
                                            >
                                                <option value="">Auswählen</option>
                                                {users.map((p) => (
                                                    <option key={p} value={p}>
                                                        {p}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                value={field.value[1] || ''}
                                                onChange={(e) => {
                                                    const newVal = [...(field.value || [])];
                                                    newVal[1] = e.target.value;
                                                    field.onChange(newVal);
                                                }}
                                            >
                                                <option value="">Auswählen</option>
                                                {users.map((p) => (
                                                    <option key={p} value={p}>
                                                        {p}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    )}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Controller
                control={control}
                name="gamesCount"
                render={({ field }) => (
                    <div className="flex space-x-4 mb-4">
                        {[1, 3].map((count) => (
                            <button
                                key={count}
                                type="button"
                                onClick={() => {
                                    field.onChange(count);
                                    setValue('matchResult', count === 1 ? '1-0' : '2-0');
                                }}
                                className={`px-4 py-2 rounded-lg font-medium ${
                                    field.value === count ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Best of {count}
                            </button>
                        ))}
                    </div>
                )}
            />

            <Controller
                control={control}
                name="matchResult"
                render={({ field }) => (
                    <>
                        {gamesCount === 1 && (
                            <div className="flex mb-4 overflow-hidden rounded-lg">
                                {(['1-0', '0-1'] as const).map((result) => (
                                    <button
                                        key={result}
                                        type="button"
                                        onClick={() => field.onChange(result)}
                                        className={`px-4 py-2 flex-1 font-medium ${
                                            field.value === result ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {result.replace('-', ' - ')}
                                    </button>
                                ))}
                            </div>
                        )}

                        {gamesCount === 3 && (
                            <div className="flex mb-4 overflow-hidden rounded-lg">
                                {(['2-0', '2-1', '1-2'] as const).map((result) => (
                                    <button
                                        key={result}
                                        type="button"
                                        onClick={() => field.onChange(result)}
                                        className={`px-4 py-2 flex-1 font-medium ${
                                            field.value === result ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {result.replace('-', ' - ')}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
                {isPending ? 'Wird gespeichert...' : 'Eintragen'}
            </button>
        </form>
    );
};

export default GameInput;
