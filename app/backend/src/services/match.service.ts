import MatchModel from '../models/match.model';
import TeamModel from '../models/team.model';
import { INewMatch, IMatchUpdate } from '../interfaces/IMatch';
import HttpException from '../utils/http.exception';
import mapError from '../utils/mapError';

export default class MatchService {
  private matchModel: MatchModel;
  private teamModel: TeamModel;

  constructor() {
    this.matchModel = new MatchModel();
    this.teamModel = new TeamModel();
  }

  public getAllMatches = async (inProgress: string | undefined) => {
    let matches;
    switch (inProgress) {
      case 'true':
        matches = await this.matchModel.getAllMatchesByProgress(true);
        break;
      case 'false':
        matches = await this.matchModel.getAllMatchesByProgress(false);
        break;
      default:
        matches = await this.matchModel.getAllMatches();
    }
    return matches;
  };

  public newMatch = async (body: INewMatch) => {
    const { homeTeam, awayTeam } = body;
    if (homeTeam === awayTeam) {
      throw new HttpException(
        mapError('unprocessable'),
        'It is not possible to create a match with two equal teams',
      );
    }
    const existHomeTeam = await this.teamModel.getOneTeam(homeTeam);
    const existAwayTeam = await this.teamModel.getOneTeam(awayTeam);
    if (!existHomeTeam || !existAwayTeam) {
      throw new HttpException(mapError('notFound'), 'There is no team with such id!');
    }

    const matchInserted = await this.matchModel.newMatch(body);
    return matchInserted;
  };

  public changeStatusMatch = async (id: number) => {
    const match = await this.matchModel.getOneMatch(id);
    if (!match) throw new HttpException(mapError('notFound'), 'Match not exist');
    const matchChanged = await this.matchModel.changeStatusMatch(id);
    return matchChanged;
  };

  public updateMatch = async (id: number, body:IMatchUpdate) => {
    const match = await this.matchModel.getOneMatch(id);
    if (!match) throw new HttpException(mapError('notFound'), 'Match not exist');
    await this.matchModel.updateMatch(id, body);
  };
}
