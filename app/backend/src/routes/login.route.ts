import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/login', (req, res, next) => userController.login(req, res, next));

export default router;
