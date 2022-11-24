import * as jwt from 'jsonwebtoken';
// import UserModel from '../models/user.model';
import { IUserLogin } from '../interfaces/IUser';
import { IJwtPayload } from '../interfaces/IJwtPayload';
import HttpException from './http.exception';
import mapError from './mapError';

export default class JwtUtil {
  static generateToken(user: IUserLogin): string {
    const token = jwt.sign({ data: { email: user.email } }, process.env.JWT_SECRET as string);
    return token;
  }

  static verifyToken = (authorization: string) => {
    try {
      const payload = <IJwtPayload>jwt.verify(authorization, process.env.JWT_SECRET as string);
      return payload;
    } catch (error) {
      throw new HttpException(mapError('unauthorized'), 'Token must be a valid token');
    }
  };
}
