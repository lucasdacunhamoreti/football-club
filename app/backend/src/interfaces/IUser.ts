import { Request } from 'express';

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser extends IUserLogin {
  username: string
  role: string;
}

export interface IUserPayload {
  data: {
    email: string;
  }
}

export interface IExtendedRequest extends Request {
  user?: IUserPayload;
}
