import { IGame } from '@/lib/interfaces/IGame';
import { create } from 'zustand';

interface GamesState {
    games: IGame[];
    setGames: (games: IGame[]) => void;
    removeGame: (id: number) => void;
    addGame: (game: IGame) => void;
}

export const useGamesStore = create<GamesState>((set) => ({
    games: [],
    setGames: (games) => set({ games }),
    removeGame: (id) => set((state) => ({ games: state.games.filter((g) => g.id !== id) })),
    addGame: (game) => set((state) => ({ games: [game, ...state.games] })),
}));
