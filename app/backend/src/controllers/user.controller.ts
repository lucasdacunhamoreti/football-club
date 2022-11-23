import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
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
      return res.status(StatusCodes.OK).json({ token: result });
    } catch (error) {
      next(error);
    }
  };
}
