import express from 'express';
import LoginController from '../controllers/LoginController';

const router = express.Router();
const loginController = new LoginController()

router.post('/verify', (req, res, next) => loginController.verify(req, res, next));

router.post('/', (req, res, next) => loginController.login(req, res, next));

export default router;