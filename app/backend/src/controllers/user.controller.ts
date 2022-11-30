import { Request, Response, NextFunction } from 'express';
import StatusCode from '../utils/StatusCode';
import UserService from '../services/user.service';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials = req.body;
      const token = await this.userService.login(credentials);
      return res.status(StatusCode.OK).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const { data } = await this.userService.validateLogin(authorization as string);
      const user = await this.userService.getUser(data.email);
      const role = user?.role;
      return res.status(StatusCode.OK).json({ role });
    } catch (error) {
      next(error);
    }
  };
}
