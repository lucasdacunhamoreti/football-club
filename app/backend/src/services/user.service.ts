import { compareSync } from 'bcryptjs';
import mapError from '../utils/mapError';
import JwtUtil from '../utils/jwt.util';
import HttpException from '../utils/http.exception';
import { IUserLogin } from '../interfaces/IUser';
import UserModel from '../models/user.model';
import userSchema from '../validations/schemas/user.schema';

export default class UserService {
  private userModel: UserModel;

  constructor(public jwt = new JwtUtil()) {
    this.userModel = new UserModel();
  }

  public login = async (user: IUserLogin) => {
    const { error } = userSchema.validate(user);
    if (error) throw new HttpException(mapError('badRequest'), 'All fields must be filled');

    const verifyUser = await this.userModel.findOne(user.email);
    if (!verifyUser) {
      throw new HttpException(mapError('unauthorized'), 'Incorrect email or password');
    }

    const validatedPassword = compareSync(user.password, verifyUser.password);
    if (!validatedPassword) {
      throw new HttpException(mapError('unauthorized'), 'Incorrect email or password');
    }

    const token = JwtUtil.generateToken(user);
    return token;
  };

  public validateLogin = async (authorization: string) => {
    if (!authorization) {
      throw new HttpException(mapError('unauthorized'), 'Token must be a valid token');
    }
    const data = await JwtUtil.verifyToken(authorization);
    return data;
  };
}
