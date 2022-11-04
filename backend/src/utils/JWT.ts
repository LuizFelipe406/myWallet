import jwt = require('jsonwebtoken');
import { User } from '../database/models'

type JwtPayload = {
  id: number;
  username: string,
  email: string,
};

export default class JWT {
  private static secret = process.env.JWT_SECRET || 'jwt_secret';

  static generateToken(user: User): string {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, this.secret);

    return token;
  }
}