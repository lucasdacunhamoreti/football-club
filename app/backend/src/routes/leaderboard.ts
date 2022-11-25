import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.getPlacingTeamHome(req, res));

export default router;
