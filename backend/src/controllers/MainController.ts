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
      const { userId } = req;
      const data = await this.service.getAll(userId as number, month, year);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req;
      const newExpense = await this.service.create(userId as number, req.body);
      return res.status(201).json(newExpense);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, params: { id }, body } = req;
      await this.service.update(parseInt(id), userId as number, body);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, params: { id }} = req;
      await this.service.delete(parseInt(id), userId as number);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}