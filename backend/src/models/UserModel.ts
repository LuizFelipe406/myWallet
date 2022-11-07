import User from '../database/models/User';

type newUserType = {
  email: string;
  password: string;
  username: string;
  pictureUrl: string;
}

export default class UserModel {
  async getUserByEmail(email:string): Promise<User | null> {
    const user = await User.findOne({ where: { email }});
    return user;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await User.findOne({ where: { username }});
    return user;
  }

  async createUser(user: newUserType) {
    const newUser = await User.create({ ...user });
    return newUser;
  }
}