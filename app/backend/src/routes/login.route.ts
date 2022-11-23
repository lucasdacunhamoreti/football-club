import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/', (req, res, next) => userController.login(req, res, next));

router.get('/validate', (req, res, next) => userController.validateLogin(req, res, next));

export default router;
