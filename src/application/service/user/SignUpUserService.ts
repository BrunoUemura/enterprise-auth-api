import bcrypt from 'bcrypt';

import userRepository from '@src/application/repository/UserRepository';
import SignUpUserDTO from '@src/application/dto/SignUpUserDTO';
import SignUpResponseDTO from '@src/application/dto/SignUpResponseDTO';
import { HttpStatusCodes } from '@src/util/enum/HttpStatusCodes';
import BadRequestError from '@src/util/error/BadRequestError';
import NotFoundError from '@src/util/error/NotFoundError';
import PublishMessage from '@src/application/service/rabbitmq/PublishMessageService';

export default class SignUpUserService {
  static async execute(data: SignUpUserDTO): Promise<SignUpResponseDTO> {
    const userExists = await userRepository.findFirst({
      where: { email: data.email },
    });

    if (userExists) throw new BadRequestError('User already registered');

    const manager = await userRepository.findFirst({
      where: {
        email: data.manager,
      },
    });

    if (!manager) throw new NotFoundError('Manager not found');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await userRepository.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        department: data.department,
        manager: data.manager,
      },
    });

    const messageToPublish = { type: 'UserCreation', ...user };
    await PublishMessage.execute('user', messageToPublish);

    return {
      status: HttpStatusCodes.CREATED,
      message: 'User Created Successfully',
    };
  }
}
