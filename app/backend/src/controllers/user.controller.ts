import { Request, Response, NextFunction } from 'express';
import mapError from '../utils/mapError';
import { IUserLogin } from '../interfaces/IUser';
import UserService from '../services/user.service';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: IUserLogin = req.body;
      const result = await this.userService.login(user);
      return res.status(mapError('ok')).json({ token: result });
    } catch (error) {
      next(error);
    }
  };

  public validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const result = await this.userService.validateLogin(authorization as string);
      return res.status(mapError('ok')).json({ role: result });
    } catch (error) {
      next(error);
    }
  };
}
