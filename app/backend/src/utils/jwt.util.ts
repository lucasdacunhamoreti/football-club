import * as jwt from 'jsonwebtoken';
import { IUserLogin } from '../interfaces/IUser';

export default class JwtUtil {
  static generateToken(user: IUserLogin): string {
    const token = jwt.sign({ data: { email: user.email } }, process.env.JWT_SECRET as string);
    return token;
  }
}
