import express from 'express';
import LoginController from '../controllers/LoginController';

export default class LoginRouter {
  public router: express.IRouter;
  private loginController: LoginController;

  constructor() {
    this.router = express.Router();
    this.loginController = new LoginController();

    this.configRoutes();    
  }

  private configRoutes() {
    this.router.post('/verify', (req, res, next) => this.loginController.verify(req, res, next));
    this.router.post('/', (req, res, next) => this.loginController.login(req, res, next));
  }
}