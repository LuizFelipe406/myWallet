import sequelize, { Op } from "sequelize";
import Revenue from "../database/models/Revenue";
import MainModel, { newValue, update } from "./MainModel";

export default class RevenueModel implements MainModel<Revenue> {
  async getAll(id: number, month: number, year: number) {
    const Revenues = await Revenue.findAll({
      where: {
        [Op.and]: [
          { userId: id },
          { date: sequelize.where(sequelize.fn("month", sequelize.col('date')), month) },
          { date: sequelize.where(sequelize.fn("year", sequelize.col('date')), year) }
        ]
      }
    });
    return Revenues;
  }

  async create(revenue: newValue) {
    const newRevenue = await Revenue.create({ ...revenue })
    return newRevenue
  }

  async update(id: number, userId:number, revenue: update) {
    const [affectecRows] = await Revenue.update(
      { ...revenue },
      { where: { id, userId } },
    );
    return affectecRows;
  }

  async delete(id:number, userId:number) {
    const affectedRows = await Revenue.destroy({ where: { id, userId }});
    return affectedRows;
  }
}