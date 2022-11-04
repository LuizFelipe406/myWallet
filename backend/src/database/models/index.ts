import { Sequelize } from 'sequelize';
import * as config from '../config/database';
import User from './User'

export default new Sequelize(config);

export { User };