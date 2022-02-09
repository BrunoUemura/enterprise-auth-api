import User from '@src/application/entity/User';

export default class SignInResponseDTO {
  status: number;
  message: string;
  token: string;
  user: User;
}
