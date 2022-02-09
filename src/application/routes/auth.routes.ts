import { Router } from 'express';
import SignUpUserController from '@src/application/controller/SignUpUserController';
import SignInUserController from '@src/application/controller/SignInUserController';

const auth = Router();

auth.post('/signup', SignUpUserController.handle);
auth.post('/signin', SignInUserController.handle);

export default auth;
