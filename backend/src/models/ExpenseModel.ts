import sequelize, { Op } from "sequelize";
import Expense from "../database/models/Expense";
import MainModel, { newValue, update } from "./MainModel";

export default class ExpenseModel implements MainModel<Expense> {
  async getAll(id: number, month: number, year: number) {
    const expenses = await Expense.findAll({
      where: {
        [Op.and]: [
          { userId: id },
          { date: sequelize.where(sequelize.fn("month", sequelize.col('date')), month) },
          { date: sequelize.where(sequelize.fn("year", sequelize.col('date')), year) }
        ]
      }
    });
    return expenses;
  }

  async create(expense: newValue) {
    const newExpense = await Expense.create({ ...expense })
    return newExpense
  }

  async update(id: number, userId:number, expense: update) {
    const [affectecRows] = await Expense.update(
      { ...expense },
      { where: { id, userId } },
    );
    return affectecRows;
  }

  async delete(id:number, userId:number) {
    const affectedRows = await Expense.destroy({ where: { id, userId }});
    return affectedRows;
  }
}