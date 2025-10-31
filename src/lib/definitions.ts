import { z } from 'zod';
const playerNameSchema = z
    .string()
    .trim()
    .min(1, 'Bitte Spieler auswählen.')
    .refine((val) => val !== 'Auswählen', 'Bitte Spieler auswählen.');
export const gameSchema = z
    .object({
        teamSize: z.enum(['single', 'double']),
        gamesCount: z.union([z.literal(1), z.literal(3)]),
        matchResult: z.enum(['1-0', '0-1', '2-0', '2-1', '1-2']),
        players: z.object({
            team1: z.array(playerNameSchema).min(1, 'Bitte Spieler 1 auswählen.'),
            team2: z.array(playerNameSchema).min(1, 'Bitte Spieler 2 auswählen.'),
        }),
    })
    .refine(
        (data) => {
            const allPlayers = [...data.players.team1, ...data.players.team2];
            const uniquePlayers = new Set(allPlayers);
            return uniquePlayers.size === allPlayers.length;
        },
        {
            message: 'Ein Spieler darf nicht doppelt vorkommen.',
            path: ['players'],
        }
    );
