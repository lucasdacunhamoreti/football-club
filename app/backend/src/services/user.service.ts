import { compareSync } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import JwtUtil from '../utils/jwt.util';
import HttpException from '../utils/http.exception';
import { IUserLogin } from '../interfaces/IUser';
import UserModel from '../models/user.model';
import userSchema from '../validations/schemas/user.schema';

export default class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  public login = async (user: IUserLogin) => {
    const { error } = userSchema.validate(user);
    if (error) throw new HttpException(StatusCodes.BAD_REQUEST, 'All fields must be filled');

    const verifyUser = await this.userModel.findOne(user.email);
    if (!verifyUser) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const validatedPassword = compareSync(user.password, verifyUser.password);
    if (!validatedPassword) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const token = JwtUtil.generateToken(user);
    return token;
  };
}
