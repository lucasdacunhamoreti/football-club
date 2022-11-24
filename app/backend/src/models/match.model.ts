import { IMatch, INewMatch } from '../interfaces/IMatch';
import MatchesModel from '../database/models/Match';
import TeamsModel from '../database/models/Team';

export default class MatchModel {
  private _model: typeof MatchesModel;

  constructor() {
    this._model = MatchesModel;
  }

  public async getAllMatches(): Promise<IMatch[] | null> {
    const result = await this._model.findAll(
      {
        include: [
          {
            model: TeamsModel,
            as: 'teamHome',
            attributes: { exclude: ['id'] },
          },
          {
            model: TeamsModel,
            as: 'teamAway',
            attributes: { exclude: ['id'] },
          },
        ],
      },
    );
    return result;
  }

  public async getAllMatchesByProgress(progress: boolean): Promise<IMatch[] | null> {
    const result = await this._model.findAll(
      {
        include: [
          {
            model: TeamsModel,
            as: 'teamHome',
            attributes: { exclude: ['id'] },
          },
          {
            model: TeamsModel,
            as: 'teamAway',
            attributes: { exclude: ['id'] },
          },
        ],
        where: { inProgress: progress },
      },
    );
    return result;
  }

  public async newMatch(body: INewMatch): Promise<IMatch> {
    const result = await this._model.create({
      homeTeam: body.homeTeam,
      awayTeam: body.awayTeam,
      homeTeamGoals: body.homeTeamGoals,
      awayTeamGoals: body.awayTeamGoals,
      inProgress: 1,
    });
    return result;
  }
}
