import { Op } from "sequelize";
import Expense from "../database/models/Expense";

export default class ExpenseModel {
  async getAll(id: number, month: number, year: number) {
    const expenses = await Expense.findAll({
      where: {
        userId: id,
        date: {
          [Op.between]: [new Date(`${year}-${month}-1`), new Date(`${year}-${month}-31`)]
        }
      }
    });
    return expenses;
  }
}