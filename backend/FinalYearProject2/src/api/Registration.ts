import express from 'express';
import { register, login } from '../application/Registration';

const RegistrationRouter = express.Router();

RegistrationRouter
     .route('/')
     .post(register);

RegistrationRouter
     .route('/login')
     .post(login);

export default RegistrationRouter;