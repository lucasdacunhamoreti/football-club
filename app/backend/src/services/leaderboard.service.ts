// import LeaderboardModel from '../models/leaderboard.model';
import { ILeaderboard } from '../interfaces/ILeaderboard';
import { IMatchComplete } from '../interfaces/IMatch';
import MatchModel from '../models/match.model';

export default class LeaderboardService {
  private matchModel: MatchModel;

  constructor() {
    this.matchModel = new MatchModel();
  }

  public getPlacing = async (teamPrimary: 'teamHome' | 'teamAway') => {
    const allGames = await this.matchModel.getAllMatchesByProgress(false);
    const teamGames = LeaderboardService.generateGames(allGames as IMatchComplete[], teamPrimary);
    const accumulatedGames = LeaderboardService.accumulateGames(teamGames);
    const finalPlacing = LeaderboardService.calculateBalanceAndEfficiency(accumulatedGames);
    return finalPlacing;
  };

  public getAllPlacing = async () => {
    const allGames = await this.matchModel.getAllMatchesByProgress(false);
    const teamHomeGames = LeaderboardService
      .generateGames(allGames as IMatchComplete[], 'teamHome');
    const teamAwayGames = LeaderboardService
      .generateGames(allGames as IMatchComplete[], 'teamAway');

    const accumulatedGames = LeaderboardService
      .accumulateGames([...teamHomeGames, ...teamAwayGames] as ILeaderboard[]);
    const finalPlacing = LeaderboardService.calculateBalanceAndEfficiency(accumulatedGames);
    return finalPlacing;
  };

  static calculateBalanceAndEfficiency(games: ILeaderboard[]) {
    const balanceAndEfficiency = games.map((game) => ({
      ...game,
      goalsBalance: game.goalsFavor - game.goalsOwn,
      efficiency: ((game.totalPoints / (game.totalGames * 3)) * 100).toFixed(2),
    }));
    return LeaderboardService.sortedScore(balanceAndEfficiency);
  }

  static sortedScore(score: ILeaderboard[]) {
    const gamesOrdened = score.sort((a, b) => (
      b.totalPoints - a.totalPoints
          || b.totalVictories - a.totalVictories
          || b.goalsBalance - a.goalsBalance
          || b.goalsFavor - a.goalsFavor
          || a.goalsOwn - b.goalsOwn
    ));
    return gamesOrdened;
  }

  static generateGames(games: IMatchComplete[], teamPrimary: 'teamHome' | 'teamAway') {
    return games.map((match) => {
      const primary = teamPrimary === 'teamHome' ? 'homeTeamGoals' : 'awayTeamGoals';
      const secondary = teamPrimary === 'teamHome' ? 'awayTeamGoals' : 'homeTeamGoals';
      let score = { point: 0, tye: 0, loss: 0, win: 0 };
      if (match[primary] === match[secondary]) score = { ...score, point: 1, tye: 1 };
      if (match[primary] > match[secondary]) score = { ...score, point: 3, win: 1 };
      if (match[primary] < match[secondary]) score = { ...score, loss: 1 };

      return {
        name: match[teamPrimary].teamName,
        totalPoints: score.point,
        totalVictories: score.win,
        totalDraws: score.tye,
        totalLosses: score.loss,
        goalsFavor: match[primary],
        goalsOwn: match[secondary],
      } as ILeaderboard;
    });
  }

  static accumulateGames(games: ILeaderboard[]) {
    const placings = [] as ILeaderboard[];
    games.forEach((game) => {
      const index = placings.findIndex((accumulator) => accumulator.name === game.name);
      const exist = index !== -1;
      if (!exist) placings.push({ ...game, totalGames: 1 });
      else {
        placings[index].totalPoints += game.totalPoints;
        placings[index].totalVictories += game.totalVictories;
        placings[index].totalDraws += game.totalDraws;
        placings[index].totalLosses += game.totalLosses;
        placings[index].goalsFavor += game.goalsFavor;
        placings[index].goalsOwn += game.goalsOwn;
        placings[index].totalGames += 1;
      }
    });
    return placings;
  }
}
