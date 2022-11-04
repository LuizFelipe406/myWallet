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
}