import User from '../database/models/User';
import { IUser } from '../interfaces/IUser';

export default class UserModel {
  private model: typeof User;

  constructor() {
    this.model = User;
  }

  public async findOne(email: string): Promise<IUser | null> {
    const result = await this.model.findOne({ where: { email } });
    return result;
  }
}
