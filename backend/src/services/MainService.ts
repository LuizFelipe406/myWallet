import ExpenseModel from "../models/ExpenseModel";

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
}