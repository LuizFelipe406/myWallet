import { User } from '../database/models';

export default class LoginModel {
  async getUserByEmail(email:string): Promise<User | null> {
    const user = await User.findOne({ where: { email }});
    return user;
  }
}