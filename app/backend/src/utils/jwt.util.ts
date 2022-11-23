import * as jwt from 'jsonwebtoken';
// import UserModel from '../models/user.model';
import { IUserLogin } from '../interfaces/IUser';
import { IJwtPayload } from '../interfaces/IJwtPayload';

export default class JwtUtil {
  static generateToken(user: IUserLogin): string {
    const token = jwt.sign({ data: { email: user.email } }, process.env.JWT_SECRET as string);
    return token;
  }

  static verifyToken = async (authorization: string) => {
    const payload = <IJwtPayload>jwt.verify(authorization, process.env.JWT_SECRET as string);
    return payload;
  };
}
