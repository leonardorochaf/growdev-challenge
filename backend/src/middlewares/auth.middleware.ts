import { NextFunction, Request, Response } from 'express';

import logger from '../log/logger';
import { UnauthorizedError } from '../errors/unauthoraized.error';
import { AuthService } from '../services/auth.service';

export class AuthMiddleware {
  constructor(private readonly authService: AuthService) { }

  authorize = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('AuthMiddleware.authorize - Authorizing user');
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        logger.error('AuthMiddleware.authorize - Token not provided');
        throw new UnauthorizedError('Token não fornecido');
      }

      await this.authService.validateToken(token);

      logger.info('AuthMiddleware.authorize - User authorized');
      return next();
    } catch (error) {
      logger.error(error, 'AuthMiddleware.authorize - Error authorizing user');
      if (error instanceof UnauthorizedError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Não foi possível processar sua solicitação' });
    }
  };
}
