import ExpenseModel from "../models/ExpenseModel";
import CustomError from "../utils/CustomError";
import expenseSchema from '../utils/ExpenseSchema';

interface ExpenseReqBody {
  name: string;
  value: number;
  date: Date;
  category: string;
}

export default class MainService {
  private model: ExpenseModel

  constructor(model: ExpenseModel) {
    this.model = model;
  }

  async getAll(id: number, month: number, year: number) {
    const data = await this.model.getAll(id, month, year);
    if (!data) throw new Error();
    return data;
  }

  async create(userId:number, body: ExpenseReqBody) {
    const { name, value, date, category } = body;
    const error = this.validateBody(name, value, date, category);
    if (error) throw new CustomError(error.message, error.status);

    const newExpense = await this.model.create({ userId, name, value, date, category });
    return newExpense;
  }

  async update(expenseId: number, userId: number, body: ExpenseReqBody) {
    const { name, value, date, category } = body;
    const error = this.validateBody(name, value, date, category);
    if (error) throw new CustomError(error.message, error.status);

    await this.model.update(expenseId, userId, { name, value, date, category });
  }

  private validateBody(name: string, value: number, date: Date, category: string) {
    const { error } = expenseSchema.validate({ name, value, date, category });
    if (error) return { status: 400, message: error.message};
    return undefined;
  }
}