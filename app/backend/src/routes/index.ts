import { Router } from 'express';
import loginRoute from './login.route';
import teamRoute from './team.route';

const route = Router();

route.use('/login', loginRoute);
route.use('/teams', teamRoute);

export default route;
