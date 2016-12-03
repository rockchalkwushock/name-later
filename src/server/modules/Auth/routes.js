import { Router } from 'express';
import { authenticate } from 'passport';
import * as Auth from './controller';
import './passportConfig';

const authRoute = new Router();

const requireLogin = authenticate('local', { session: false });

authRoute.route('/auth/signup').post(Auth.signup);
authRoute.route('/auth/login').post(requireLogin, Auth.login);

export default authRoute;
