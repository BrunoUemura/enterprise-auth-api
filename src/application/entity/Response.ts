import User from '@src/application/entity/User';

export default class Response {
  status: number;
  message: string;
  token: string;
  user: User;
}
