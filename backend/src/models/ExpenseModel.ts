import Expense from "../database/models/Expense";

export default class ExpenseModel {
  async getAll(id: string) {
    const expenses = await Expense.findAll({ where: { userId: id }});
    return expenses;
  }
}