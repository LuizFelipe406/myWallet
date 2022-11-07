import jwt = require('jsonwebtoken');
import { User } from '../database/models'
import { CustomErrorParams } from './CustomError';

export type JwtPayload = {
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

  static validateToken(token: string): JwtPayload | CustomErrorParams {
    try {
      const payload = jwt.verify(token, this.secret);
      return payload as JwtPayload
    } catch (error) {
      return { status: 401, message: "invalid token"}
    }
  }
}