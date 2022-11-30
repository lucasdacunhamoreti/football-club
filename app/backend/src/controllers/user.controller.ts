import { Request, Response, NextFunction } from 'express';
import StatusCode from '../utils/StatusCode';
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
      return res.status(StatusCode.OK).json({ token: result });
    } catch (error) {
      next(error);
    }
  };

  public validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const { data } = await this.userService.validateLogin(authorization as string);
      const verifyUser = await this.userService.getUser(data);
      const role = verifyUser?.role;
      return res.status(StatusCode.OK).json({ role });
    } catch (error) {
      next(error);
    }
  };
}
