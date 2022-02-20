import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userRepository from '@src/application/repository/UserRepository';
import Response from '@src/application/entity/Response';
import SignInUser from '@src/application/entity/SignInUser';
import NotFoundError from '@src/util/error/NotFoundError';
import UnauthorizedError from '@src/util/error/UnauthorizedError';
import { HttpStatusCodes } from '@src/util/enum/HttpStatusCodes';

export default class SignInUserService {
  static async execute(data: SignInUser): Promise<Response> {
    const user = await userRepository.findFirst({
      where: { email: data.email },
    });

    if (!user) throw new NotFoundError('User not registered');

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) throw new UnauthorizedError('Incorrect credentials');

    const payload = { id: user.id };
    const expiration = { expiresIn: '1h' };
    const token = jwt.sign(payload, String(process.env.JWT_SECRET), expiration);

    return {
      status: HttpStatusCodes.OK,
      message: 'Successfully authenticated',
      token,
      user,
    };
  }
}
