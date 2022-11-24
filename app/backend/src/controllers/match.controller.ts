import { Request, Response } from 'express';
import mapError from '../utils/mapError';
import MatchService from '../services/match.service';

export default class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const result = await this.matchService.getAllMatches(inProgress as string);
    return res.status(mapError('ok')).json(result);
  };

  public newMatch = async (req: Request, res: Response) => {
    const result = await this.matchService.newMatch(req.body);
    return res.status(mapError('created')).json(result);
  };
}
