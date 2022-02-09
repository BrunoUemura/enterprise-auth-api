import { NextFunction, Request, Response } from 'express';
import SignUpUserService from '../usecase/SignUpUserService';

export default class SignUpUserController {
  static async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { name, email, password, role, department, manager } = request.body;
      const result = await SignUpUserService.execute({
        name,
        email,
        password,
        role,
        department,
        manager,
      });
      return response.json(result);
    } catch (err) {
      next(err);
    }
  }
}
