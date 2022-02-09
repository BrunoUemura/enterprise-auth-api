import { NextFunction, Request, Response } from 'express';
import SignInUserService from '../usecase/SignInUserService';

export default class SignInUserController {
  static async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password } = request.body;
      const result = await SignInUserService.execute({
        email,
        password,
      });
      return response.json(result);
    } catch (err) {
      next(err);
    }
  }
}
