import { ITeam } from '../interfaces/ITeam';
import TeamsModel from '../database/models/Team';

export default class TeamModel {
  private _model: typeof TeamsModel;

  constructor() {
    this._model = TeamsModel;
  }

  public async getAllTeams(): Promise<ITeam[] | null> {
    const result = await this._model.findAll();
    return result;
  }
}
