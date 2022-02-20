import { Router } from 'express';

import SignInUserController from '@src/application/controller/SignInUserController';

const auth = Router();

auth.post('/signin', SignInUserController.handle);

export default auth;
