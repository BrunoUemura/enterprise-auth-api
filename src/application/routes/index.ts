import { NextFunction, Request, Response, Router } from 'express';

import auth from '@src/application/routes/auth.routes';
import NotFoundError from '@src/util/error/NotFoundError';

const routes = Router();

routes.use('/api/v1/auth', auth);

routes.use((req: Request, _res: Response, next: NextFunction) => {
  if (!req.route) {
    return next(new NotFoundError('Route not found'));
  }
  next();
});

export default routes;
