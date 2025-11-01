'use client';

import { useEffect } from 'react';
import { useGamesStore } from '@/stores/useGamesStore';
import { IGame } from '@/lib/interfaces/IGame';

export default function GamesHydrator({ initialGames }: { initialGames: IGame[] }) {
    const setGames = useGamesStore((s) => s.setGames);

    useEffect(() => {
        setGames(initialGames);
    }, [initialGames, setGames]);

    return null;
}
