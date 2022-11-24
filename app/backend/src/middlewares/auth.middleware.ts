import { NextFunction, Response } from 'express';
import { IExtendedRequest, IUserPayload } from '../interfaces/IUser';
import UserService from '../services/user.service';

export default class ValidateToken {
  public authService = new UserService();

  public verifyAccess = async (req: IExtendedRequest, _res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const token = authorization as string;

    try {
      const data = await this.authService.validateLogin(token);

      req.user = { data } as IUserPayload;

      next();
    } catch (error) {
      next(error);
    }
  };
}
