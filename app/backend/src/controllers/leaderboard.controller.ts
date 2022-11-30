import { Request, Response } from 'express';
import StatusCode from '../utils/StatusCode';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public getPlacingTeamHome = async (_req: Request, res: Response) => {
    const result = await this.leaderboardService.getPlacing('teamHome');
    return res.status(StatusCode.OK).json(result);
  };

  public getPlacingTeamAway = async (_req: Request, res: Response) => {
    const result = await this.leaderboardService.getPlacing('teamAway');
    return res.status(StatusCode.OK).json(result);
  };

  public getAllPlacing = async (_req: Request, res: Response) => {
    const result = await this.leaderboardService.getAllPlacing();
    return res.status(StatusCode.OK).json(result);
  };
}
