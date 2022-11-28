import { Request, Response, NextFunction } from 'express';
import StatusCode from '../utils/StatusCode';
import MatchService from '../services/match.service';

export default class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const result = await this.matchService.getAllMatches(inProgress as string);
    return res.status(StatusCode.OK).json(result);
  };

  public newMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.matchService.newMatch(req.body);
      return res.status(StatusCode.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  };

  public changeStatusMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.matchService.changeStatusMatch(+id);
      return res.status(StatusCode.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  public updateMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.matchService.updateMatch(+id, req.body);
      return res.status(StatusCode.OK).json({ message: 'Match updated!' });
    } catch (error) {
      next(error);
    }
  };
}
