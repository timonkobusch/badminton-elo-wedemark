export interface IGame {
    id: number;
    created_at: Date;
    team_size: 1 | 2;
    game_count: number;
    team_one_players: string[];
    team_one_score: number;
    team_two_players: string[];
    team_two_score: number;
    winner_team: string;
    deleted_at: Date | null;
    season_id: number;
}
