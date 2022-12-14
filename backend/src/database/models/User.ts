import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class User extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare pictureUrl: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pictureUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  modelName: 'User',
  tableName: 'Users',
  timestamps: false,
  sequelize: sequelize,
});

export default User;