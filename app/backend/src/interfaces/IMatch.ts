export interface ITeams {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatch extends ITeams {
  id?: number;
  inProgress: boolean;
}

export interface IMatchComplete extends IMatch {
  teamHome: {
    teamName: string;
  };
  teamAway: {
    teamName: string;
  };
}

export interface IMatchFinally {
  message: string;
}

export interface IMatchUpdate {
  homeTeamGoals: number;
  awayTeamGoals: number;
}
