import { Request, Response, NextFunction } from 'express';
import { HttpStatusCodes } from '@src/util/enum/HttpStatusCodes';
import { CustomError } from '@src/util/error/CustomError';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .send({ status: err.statusCode, errors: err.serializeErrors() });
  }

  res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
    status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    errors: [{ message: 'Something went wrong' }],
  });
};

export default errorHandler;
