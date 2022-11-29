import { compareSync } from 'bcryptjs';
import StatusCode from '../utils/StatusCode';
import JwtUtil from '../utils/jwt.util';
import HttpException from '../utils/http.exception';
import { IUserLogin } from '../interfaces/IUser';
import UserModel from '../models/user.model';
import userSchema from '../validations/schemas/user.schema';

export default class UserService {
  private userModel: UserModel;
  private messageLoginFail: string;

  constructor(public jwt = new JwtUtil()) {
    this.userModel = new UserModel();
    this.messageLoginFail = 'Incorrect email or password';
  }

  public getUser = async (email: string) => {
    const user = await this.userModel.getUser(email);
    return user;
  };

  public login = async (user: IUserLogin) => {
    const { error } = userSchema.validate(user);
    if (error) throw new HttpException(StatusCode.BAD_REQUEST, this.messageLoginFail);

    const verifyUser = await this.getUser(user.email);
    if (!verifyUser) {
      throw new HttpException(StatusCode.UNAUTHORIZED, this.messageLoginFail);
    }

    const validatedPassword = compareSync(user.password, verifyUser.password);
    if (!validatedPassword) {
      throw new HttpException(StatusCode.UNAUTHORIZED, this.messageLoginFail);
    }

    const token = JwtUtil.generateToken(user);
    return token;
  };

  public validateLogin = async (authorization: string) => {
    if (!authorization) {
      throw new HttpException(StatusCode.UNAUTHORIZED, 'Token not found');
    }
    const payload = JwtUtil.verifyToken(authorization);
    return payload;
  };
}
