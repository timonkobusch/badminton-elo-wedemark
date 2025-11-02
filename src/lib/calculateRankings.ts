import { IGame } from '@/lib/interfaces/IGame';
import { IRankingTableRow } from '@/lib/interfaces/IRankingTableRow';

export const calculateRankings = (games: IGame[]): IRankingTableRow[] => {
    const BASE_ELO = 1500;
    const players: Record<string, number> = {};

    // init base_elo for all players
    games
        .map((g) => [...g.team_one_players, ...g.team_two_players])
        .flat()
        .forEach((player) => (players[player] ??= BASE_ELO));

    games = games.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    // Apply Elo updates, games are already in chronological order from oldest to newest from database
    let K;
    for (const game of games) {
        if (game.game_count == 1) K = 24;
        else if (game.game_count == 3) K = 32;
        else K = 40;

        const averageElo = (team: string[]) => team.reduce((sum, p) => sum + players[p], 0) / team.length;

        const teamOneElo = averageElo(game.team_one_players);
        const teamTwoElo = averageElo(game.team_two_players);

        const expected = (a: number, b: number) => 1 / (1 + Math.pow(10, (b - a) / 400));
        const expectedOne = expected(teamOneElo, teamTwoElo);
        const expectedTwo = 1 - expectedOne;

        const playedGames = game.team_one_score + game.team_two_score;
        const scoreOne = game.team_one_score / playedGames;
        const scoreTwo = game.team_two_score / playedGames;

        const changeOne = K * (scoreOne - expectedOne);
        const changeTwo = K * (scoreTwo - expectedTwo);

        game.team_one_players.forEach((p) => (players[p] += changeOne));
        game.team_two_players.forEach((p) => (players[p] += changeTwo));
    }

    // ranking table
    const rankings = Object.entries(players).map(([name, elo]) => ({
        name,
        elo: Math.round(elo),
        wins: 0,
        losses: 0,
        winrate: 0,
    }));

    // wins/losses
    for (const game of games) {
        const [winners, losers] =
            game.winner_team === 'team_one' ? [game.team_one_players, game.team_two_players] : [game.team_two_players, game.team_one_players];

        winners.forEach((p) => rankings.find((r) => r.name === p)!.wins++);
        losers.forEach((p) => rankings.find((r) => r.name === p)!.losses++);
    }

    // winrates
    rankings.forEach((r) => {
        const total = r.wins + r.losses;
        r.winrate = total ? Math.round((r.wins / total) * 100) : 0;
    });

    return rankings.sort((a, b) => b.elo - a.elo);
};
export default calculateRankings;
