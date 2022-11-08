import express from 'express';
import MainController from '../controllers/MainController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import ExpenseModel from '../models/ExpenseModel';

export default class LoginRouter {
  public router: express.IRouter;
  private controller: MainController;
  private model: ExpenseModel;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = express.Router();
    this.authMiddleware = new AuthMiddleware();
    this.model = new ExpenseModel();
    this.controller = new MainController(this.model);

    this.configRoutes();    
  }

  private configRoutes() {
    this.router.use(this.authMiddleware.validateToken);

    this.router.get('/', (req, res, next) => this.controller.getAll(req, res, next));

    this.router.post('/', (req, res, next) => this.controller.create(req, res, next));

    this.router.put('/', (req, res, next) => this.controller.update(req, res, next));
  }
}