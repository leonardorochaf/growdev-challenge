import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';
import { UserRepository } from '../repositories/user.repository';
import { AuthService } from '../services/auth.service';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export default (router: Router) => {
  router.post('/login', (req, res) => {
    authController.login(req, res);
  });
};
