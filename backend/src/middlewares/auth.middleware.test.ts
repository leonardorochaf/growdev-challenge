import { NextFunction, Request, Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';

import { AuthService } from '../services/auth.service';
import { AuthMiddleware } from './auth.middleware';
import { UnauthorizedError } from '../errors/unauthoraized.error';

jest.mock('../log/logger');

describe('AuthMiddleware', () => {
  const authService = {
    validateToken: jest.fn(),
  } as unknown as jest.Mocked<AuthService>;

  let sut: AuthMiddleware;

  beforeEach(() => {
    sut = new AuthMiddleware(authService);
  });

  describe('authorize', () => {
    let request: Request;
    let response: Response;
    let next: NextFunction;

    beforeEach(() => {
      authService.validateToken.mockResolvedValue({});
      request = getMockReq({ headers: { authorization: 'Bearer token' } });
      response = getMockRes().res;
      next = jest.fn();
    });

    it('Should call authService.validateToken with correct value', async () => {
      await sut.authorize(request, response, next);

      expect(authService.validateToken).toHaveBeenCalledWith('token');
    });

    it('Should call next if token is valid', async () => {
      await sut.authorize(request, response, next);

      expect(next).toHaveBeenCalled();
    });

    it('Should return 401 if token is not provided', async () => {
      request = getMockReq({ headers: {} });

      await sut.authorize(request, response, next);

      expect(response.status).toHaveBeenCalledWith(401);
      expect(response.json).toHaveBeenCalledWith({ error: 'Token não fornecido' });
    });

    it('Should return 401 if authService.validateToken throws UnauthorizedError', async () => {
      authService.validateToken.mockRejectedValueOnce(new UnauthorizedError('UnauthorizedError'));

      await sut.authorize(request, response, next);

      expect(response.status).toHaveBeenCalledWith(401);
      expect(response.json).toHaveBeenCalledWith({ error: 'UnauthorizedError' });
    });

    it('Should return 500 if authService.validateToken throws', async () => {
      authService.validateToken.mockRejectedValueOnce(new Error());

      await sut.authorize(request, response, next);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ error: 'Não foi possível processar sua solicitação' });
    });
  });
});
