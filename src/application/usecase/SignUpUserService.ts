import bcrypt from 'bcrypt';
import userRepository from '@src/application/repository/UserRepository';
import SignUpUser from '@src/application/dto/SignUpUser';
import { HttpStatusCodes } from '@src/util/enum/HttpStatusCodes';

export default class SignUpUserService {
  static async execute(data: SignUpUser) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await userRepository.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role,
        department: data.department,
        manager: data.manager,
      },
    });

    return {
      status: HttpStatusCodes.CREATED,
      message: 'User Created Successfully',
    };
  }
}
