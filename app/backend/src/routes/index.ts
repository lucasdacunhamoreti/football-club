import { Router } from 'express';
import loginRoute from './login.route';
import teamRoute from './team.route';
import matchRoute from './match.route';

const route = Router();

route.use('/login', loginRoute);
route.use('/teams', teamRoute);
route.use('/matches', matchRoute);

export default route;
