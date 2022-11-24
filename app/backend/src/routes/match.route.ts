import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const router = Router();
const matchController = new MatchController();
const authMiddleware = new AuthMiddleware();

router.get('/', (req, res) => matchController.getAllMatches(req, res));

router.post(
  '/',
  authMiddleware.verifyAccess,
  (req, res, next) => matchController.newMatch(req, res, next),
);

router.patch(
  '/:id/finish',
  authMiddleware.verifyAccess,
  (req, res, next) => matchController.changeStatusMatch(req, res, next),
);

export default router;
