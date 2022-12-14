import User from '../database/models/User';
import bcrypt = require('bcryptjs');
import UserModel from '../models/UserModel';
import CustomError, { CustomErrorParams } from '../utils/CustomError';
import userSchema from '../utils/joi/UserSchema';

export default class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async create(body: User) {
    const { email, password, username, pictureUrl } = body;
    const error = await this.verifications(body);
    if (error) throw new CustomError(error.message, error.status);

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = await this.userModel.createUser({
      email,
      password: hashPassword,
      username,
      pictureUrl
    });

    return newUser;
  }

  private validateBody(body: User): CustomErrorParams | undefined {
    const { email, password, username, pictureUrl } = body;
    const { error } = userSchema.validate({ email, password, username, pictureUrl });
    if (error) return { status: 400, message: error.message};
    return undefined;
  }

  private async verifyEmail(email: string): Promise<CustomErrorParams | undefined> {
    const user = await this.userModel.getUserByEmail(email);
    if (user) return { status: 400, message: "email already used"};
    return undefined
  }

  private async verifyUsername(username: string): Promise<CustomErrorParams | undefined> {
    const user = await this.userModel.getUserByUsername(username);
    if (user) return { status: 400, message: "username already used"};
    return undefined
  }

  private async verifications(body: User): Promise<CustomErrorParams | undefined> {
    let error = undefined;
    error = this.validateBody(body);
    if (error) return error;

    error = await this.verifyEmail(body.email);
    if (error) return error;

    error = await this.verifyUsername(body.username);
    return error;
  }
}