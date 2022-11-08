import { Op } from "sequelize";
import Expense from "../database/models/Expense";

interface updateExpense {
  name: string;
  value: number;
  date: Date;
  category: string;
}

interface newExpense extends updateExpense {
  userId: number;
}

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

  async create(expense: newExpense) {
    const newExpense = await Expense.create({ ...expense })
    return newExpense
  }

  async update(id: number, userId:number, expense: updateExpense) {
    await Expense.update(
      { ...expense },
      { where: { id, userId } },
    );
  }
}