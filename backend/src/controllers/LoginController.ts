import { NextFunction, Request, Response } from "express";
import LoginService from "../services/LoginService";

export default class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await this.loginService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      this.loginService.validateToken(authorization as string);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}