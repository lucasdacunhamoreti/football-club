import { Request, Response, NextFunction } from 'express';
import mapError from '../utils/mapError';
import { IUserLogin } from '../interfaces/IUser';
import UserService from '../services/user.service';
import UserModel from '../models/user.model';

export default class UserController {
  private userService: UserService;
  private userModel: UserModel;

  constructor() {
    this.userService = new UserService();
    this.userModel = new UserModel();
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
      const { data } = await this.userService.validateLogin(authorization as string);
      console.log('controller');
      const verifyUser = await this.userModel.findOne(data.email);
      const role = verifyUser?.role;
      return res.status(mapError('ok')).json({ role });
    } catch (error) {
      next(error);
    }
  };
}
