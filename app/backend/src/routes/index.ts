import { Router } from 'express';
import loginRoute from './login.route';
import teamRoute from './team.route';
import matchRoute from './match.route';
import leaderboardRoute from './leaderboard';

const route = Router();

route.use('/login', loginRoute);
route.use('/teams', teamRoute);
route.use('/matches', matchRoute);
route.use('/matches', matchRoute);
route.use('/leaderboard', leaderboardRoute);

export default route;
