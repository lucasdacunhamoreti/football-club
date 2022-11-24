import MatchModel from '../models/match.model';
import { INewMatch } from '../interfaces/IMatch';

export default class MatchService {
  private matchModel: MatchModel;

  constructor() {
    this.matchModel = new MatchModel();
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
    const matchInserted = await this.matchModel.newMatch(body);
    return matchInserted;
  };
}
