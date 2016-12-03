import { Router } from 'express';
import passport from 'passport';
import * as Auth from './controller';
import './passportConfig';

const authRoute = new Router();

const requireLogin = passport.authenticate('local', { session: false });

authRoute.route('/auth/signup').post(Auth.signup);
authRoute.route('/auth/login').post(requireLogin, Auth.login);

export default authRoute;
