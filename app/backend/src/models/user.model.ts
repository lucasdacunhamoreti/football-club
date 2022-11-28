import User from '../database/models/User';
import { IUser } from '../interfaces/IUser';

export default class UserModel {
  private _model: typeof User;

  constructor() {
    this._model = User;
  }

  public async getUser(email: string): Promise<IUser | null> {
    const result = await this._model.findOne({ where: { email } });
    return result;
  }
}
