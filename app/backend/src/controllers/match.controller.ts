import { Request, Response } from 'express';
import mapError from '../utils/mapError';
import MatchService from '../services/match.service';

export default class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public getAllMatches = async (_req: Request, res: Response) => {
    const result = await this.matchService.getAllMatches();
    return res.status(mapError('ok')).json(result);
  };
}