import { DataTypes, Model } from 'sequelize';
import sequelize from './index';
import User from './User';

class Revenue extends Model {
  declare id: number;
  declare name: string;
  declare value: number;
  declare date: Date;
  declare category: string;
  declare userId: number;
}

Revenue.init({
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
  modelName: 'Revenue',
  tableName: 'Revenues',
  timestamps: false,
  underscored: true,
  sequelize: sequelize,
});

User.hasMany(Revenue, { foreignKey: 'userId' });

Revenue.belongsTo(User, { foreignKey: 'userId' });

export default Revenue;