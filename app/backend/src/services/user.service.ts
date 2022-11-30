import { compareSync } from 'bcryptjs';
import StatusCode from '../utils/StatusCode';
import JwtUtil from '../utils/jwt.util';
import HttpException from '../utils/http.exception';
import { IUserLogin } from '../interfaces/IUser';
import UserModel from '../models/user.model';
import userSchema from '../validations/schemas/user.schema';

export default class UserService {
  private userModel: UserModel;
  private errorCredentials: string;

  constructor(public jwt = new JwtUtil()) {
    this.userModel = new UserModel();
    this.errorCredentials = 'Incorrect email or password';
  }

  public getUser = async (email: string) => {
    const user = await this.userModel.getUser(email);
    return user;
  };

  public login = async (credentials: IUserLogin) => {
    const { email, password } = credentials;
    const { error } = userSchema.validate(credentials);
    if (error) throw new HttpException(StatusCode.BAD_REQUEST, error.message);

    const user = await this.userModel.getUser(email);
    if (!user) {
      throw new HttpException(StatusCode.UNAUTHORIZED, this.errorCredentials);
    }

    const validatedPassword = compareSync(password, user.password);
    if (!validatedPassword) {
      throw new HttpException(StatusCode.UNAUTHORIZED, this.errorCredentials);
    }

    const token = JwtUtil.generateToken(credentials);
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
