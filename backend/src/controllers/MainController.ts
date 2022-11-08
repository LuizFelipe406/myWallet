import { NextFunction, Request, Response } from "express";
import ExpenseModel from "../models/ExpenseModel";
import MainService from "../services/MainService";

export default class MainController {
  private service: MainService;

  constructor(model: ExpenseModel) {
    this.service = new MainService(model);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { month, year } = req.body;
      const { id } = req;
      const data = await this.service.getAll(id as number, month, year);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}