import { HttpStatusCodes } from '@src/util/enum/HttpStatusCodes';
import { CustomError } from '@src/util/error/CustomError';

export default class DatabaseConnectionError extends CustomError {
  statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  message = 'Database Connection Error';

  constructor() {
    super('Database Connection Error');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ status: this.statusCode, message: this.message }];
  }
}
