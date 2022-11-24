import MatchModel from '../models/match.model';

export default class MatchService {
  private matchModel: MatchModel;

  constructor() {
    this.matchModel = new MatchModel();
  }

  public getAllMatches = async () => {
    const matches = await this.matchModel.getAllMatches();
    return matches;
  };
}
