import bcrypt = require('bcryptjs');
import { User } from '../database/models';
import UserModel from '../models/UserModel';
import CustomError from '../utils/CustomError';
import JWT from '../utils/JWT';
import loginSchema from '../utils/LoginSchema';

export default class LoginService {
  private userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }

  async login(email: string, password: string): Promise<string> {
    const error = this.validateParams(email, password);
    if (error) throw new CustomError(error.message, error.status);

    const validation = await this.validateUser(email, password);
    if (!(validation instanceof User)) throw new CustomError(validation.message, validation.status);

    return JWT.generateToken(validation);
  }

  private validateParams(email:string, password:string) {
    const { error } = loginSchema.validate({ email, password });
    if (error) return { status: 401, message: error.message};
    return undefined;
  }

  private async validateUser(email: string, password: string) {
    const user = await this.userModel.getUserByEmail(email);
    if (!user) return { status: 401, message: 'invalid credentials'};

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return { status: 401, message: 'invalid credentials' };
    }

    return user
  }

  public validateToken(token: string) {
    const verification = JWT.validateToken(token)
    if (!("id" in verification)) throw new CustomError(verification.message, verification.status);
  }
}