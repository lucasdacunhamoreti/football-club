import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload{
  data: {
    email: string;
    password: string;
  }
}
