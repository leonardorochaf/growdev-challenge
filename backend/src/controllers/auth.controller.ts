import { Request, Response } from 'express';

import { AuthService } from '../services/auth.service';
import logger from '../log/logger';
import { UnauthorizedError } from '../errors/unauthoraized.error';
import { Validator } from '../validation/validator';
import { loginSchema } from '../validation/schemas/auth.schemas';

export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Validator(loginSchema)
  async login(req: Request, res: Response) {
    logger.info('AuthController.login - Logging in user');
    try {
      const { username, password } = req.body;

      const { token } = await this.authService.login({ username, password });

      logger.info('AuthController.login - User logged in successfully');
      return res.status(200).json({ token });
    } catch (error) {
      logger.error(error, 'AuthController.login - Error logging in user');
      if (error instanceof UnauthorizedError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Não foi possível processar sua solicitação' });
    }
  }
}
