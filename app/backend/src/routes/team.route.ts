import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();
const teamController = new TeamController();

router.get('/', (req, res, next) => teamController.getAllTeams(req, res, next));

export default router;
