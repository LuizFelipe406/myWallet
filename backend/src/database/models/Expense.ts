import { DataTypes, Model } from 'sequelize';
import sequelize from './index';
import User from './User';

class Expense extends Model {
  declare id: number;
  declare name: string;
  declare value: number;
  declare date: Date;
  declare category: string;
  declare userId: number;
}

Expense.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
  }
}, {
  modelName: 'Expense',
  tableName: 'Expenses',
  timestamps: false,
  underscored: true,
  sequelize: sequelize,
});

User.hasMany(Expense, { foreignKey: 'userId', as: 'user' });

Expense.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Expense;