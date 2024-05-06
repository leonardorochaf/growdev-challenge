import { Request, Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';

import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';
import { UnauthorizedError } from '../errors/unauthoraized.error';

jest.mock('../log/logger');
jest.mock('../validation/validator');

describe('AuthController', () => {
  const authService = {
    login: jest.fn(),
  } as unknown as jest.Mocked<AuthService>;

  let sut: AuthController;

  beforeEach(() => {
    sut = new AuthController(authService);
  });

  describe('login', () => {
    let request: Request;
    let response: Response;

    const requestBody = {
      username: 'johndoe',
      password: 'password',
    };

    beforeEach(() => {
      authService.login.mockResolvedValue({ token: 'token' });
      request = getMockReq({ body: requestBody });
      response = getMockRes().res;
    });

    it('Should call authService.login with correct value', async () => {
      await sut.login(request, response);

      expect(authService.login)
        .toHaveBeenCalledWith({ username: requestBody.username, password: requestBody.password });
    });

    it('Should return 401 if authService.login throws UnauthorizedError', async () => {
      authService.login.mockRejectedValueOnce(new UnauthorizedError('UnauthorizedError'));

      await sut.login(request, response);

      expect(response.status).toHaveBeenCalledWith(401);
      expect(response.json).toHaveBeenCalledWith({ message: 'UnauthorizedError' });
    });

    it('Should return 500 if authService.login throws', async () => {
      authService.login.mockRejectedValueOnce(new Error());

      await sut.login(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ message: 'Não foi possível processar sua solicitação' });
    });

    it('Should return 200 with token', async () => {
      await sut.login(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({ token: 'token' });
    });
  });
});
