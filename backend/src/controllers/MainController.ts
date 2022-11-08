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

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req;
      const newExpense = await this.service.create(id as number, req.body);
      res.status(201).json(newExpense);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, params: { expenseId }, body } = req;
      await this.service.update(parseInt(expenseId), id as number, body);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}