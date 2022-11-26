import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.getPlacingTeamHome(req, res));

router.get('/away', (req, res) => leaderboardController.getPlacingTeamAway(req, res));

router.get('/', (req, res) => leaderboardController.getAllPlacing(req, res));

export default router;
