export interface IGame {
    id: number;
    created_at: Date;
    teamSize: string;
    gamesCount: number;
    matchResult: string;
    playersTeamOne: string[];
    playersTeamTwo: string[];
}
