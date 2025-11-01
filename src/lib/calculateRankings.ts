import { IGame } from '@/lib/interfaces/IGame';
import { IRankingTableRow } from '@/lib/interfaces/IRankingTableRow';

const calculateRankings = (games: IGame[]): IRankingTableRow[] => {
    // initialize player list with elo 1500
    const players: { [key: string]: number } = {};

    for (const game of games) {
        for (const player of [...game.team_one_players, ...game.team_two_players]) {
            if (!(player in players)) {
                players[player] = 1500;
            }
        }
    }
    // calculate elo for each game start with oldest game
    const sortedGames = games.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    const K = 32;
    for (const game of sortedGames) {
        const teamOneElo = game.team_one_players.reduce((sum, player) => sum + players[player], 0) / game.team_one_players.length;
        const teamTwoElo = game.team_two_players.reduce((sum, player) => sum + players[player], 0) / game.team_two_players.length;
        const expectedScoreTeamOne = 1 / (1 + Math.pow(10, (teamTwoElo - teamOneElo) / 400));
        const expectedScoreTeamTwo = 1 / (1 + Math.pow(10, (teamOneElo - teamTwoElo) / 400));
        let scoreTeamOne: number;
        let scoreTeamTwo: number;
        if (game.winner_team === 'team_one') {
            scoreTeamOne = 1;
            scoreTeamTwo = 0;
        } else {
            scoreTeamOne = 0;
            scoreTeamTwo = 1;
        }
        const eloChangeTeamOne = K * (scoreTeamOne - expectedScoreTeamOne);
        const eloChangeTeamTwo = K * (scoreTeamTwo - expectedScoreTeamTwo);
        for (const player of game.team_one_players) {
            players[player] += eloChangeTeamOne;
        }
        for (const player of game.team_two_players) {
            players[player] += eloChangeTeamTwo;
        }
    }

    // convert to ranking table rows
    const rankings: IRankingTableRow[] = Object.entries(players).map(([name, elo]) => ({
        name,
        elo: Math.round(elo),
        winrate: 0,
        wins: 0,
        losses: 0,
    }));
    // calculate wins and losses
    for (const game of games) {
        let winningPlayers: string[];
        let losingPlayers: string[];
        if (game.winner_team === 'team_one') {
            winningPlayers = game.team_one_players;
            losingPlayers = game.team_two_players;
        } else {
            winningPlayers = game.team_two_players;
            losingPlayers = game.team_one_players;
        }
        for (const player of winningPlayers) {
            const playerRow = rankings.find((p) => p.name === player);
            if (playerRow) {
                playerRow.wins += 1;
            }
        }
        for (const player of losingPlayers) {
            const playerRow = rankings.find((p) => p.name === player);
            if (playerRow) {
                playerRow.losses += 1;
            }
        }
    }
    // calculate winrate
    for (const player of rankings) {
        const totalGames = player.wins + player.losses;
        player.winrate = totalGames > 0 ? Math.round((player.wins / totalGames) * 100) : 0;
    }
    // sort by elo descending
    rankings.sort((a, b) => b.elo - a.elo);
    return rankings;
};
export default calculateRankings;
