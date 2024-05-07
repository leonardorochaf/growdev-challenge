import { UserRepository } from '../repositories/user.repository';
import { AuthService } from './auth.service';
import { validatePassword } from '../utils/crypt.utils';
import { generateToken, verifyToken } from '../utils/token.utils';

jest.mock('../repositories/user.repository', () => ({
  UserRepository: jest.fn().mockImplementation(() => ({
    findByUsername: jest.fn(),
  })),
}));
jest.mock('../utils/crypt.utils', () => ({
  validatePassword: jest.fn(),
}));
jest.mock('../utils/token.utils', () => ({
  generateToken: jest.fn(),
  verifyToken: jest.fn(),
}));
jest.mock('../log/logger');

describe('AuthService', () => {
  const mockUserRepository = new UserRepository() as jest.Mocked<UserRepository>;
  let sut: AuthService;

  beforeEach(() => {
    sut = new AuthService(mockUserRepository);
  });

  describe('login', () => {
    beforeAll(() => {
      mockUserRepository.findByUsername.mockResolvedValue({
        id: 1,
        username: 'johndoe',
        password: 'hashedpassword',
        role: {
          id: 1,
          name: 'admin',
        },
      });
      (validatePassword as jest.Mock).mockResolvedValue(true);
      (generateToken as jest.Mock).mockResolvedValue('token');
    });

    it('Should call findByUsername with correct value', async () => {
      await sut.login({ username: 'username', password: 'password' });

      expect(mockUserRepository.findByUsername).toHaveBeenCalledWith('username');
    });

    it('Should throw if user not found', async () => {
      mockUserRepository.findByUsername.mockResolvedValueOnce(null);

      const promise = sut.login({ username: 'username', password: 'password' });

      await expect(promise).rejects.toThrow('Credenciais inválidas');
    });

    it('Should throw if user is not an admin', async () => {
      mockUserRepository.findByUsername.mockResolvedValueOnce({
        id: 1,
        username: 'johndoe',
        password: 'hashedpassword',
        role: {
          id: 2,
          name: 'user',
        },
      });

      const promise = sut.login({ username: 'username', password: 'password' });

      await expect(promise).rejects.toThrow('Usuário não possui permissão para acessar este recurso');
    });

    it('Should call validatePassword with correct values', async () => {
      await sut.login({ username: 'username', password: 'password' });

      expect(validatePassword).toHaveBeenCalledWith('password', 'hashedpassword');
    });

    it('Should throw if password is invalid', async () => {
      (validatePassword as jest.Mock).mockResolvedValueOnce(false);

      const promise = sut.login({ username: 'username', password: 'password' });

      await expect(promise).rejects.toThrow('Credenciais inválidas');
    });

    it('Should call generateToken with correct value', async () => {
      await sut.login({ username: 'username', password: 'password' });

      expect(generateToken).toHaveBeenCalledWith({ id: 1, role: 'admin' });
    });

    it('Should return token', async () => {
      const result = await sut.login({ username: 'username', password: 'password' });

      expect(result).toEqual({ token: 'token' });
    });
  });

  describe('validateToken', () => {
    beforeAll(() => {
      (verifyToken as jest.Mock).mockResolvedValue('token');
    });

    it('Should call verifyToken with correct value', async () => {
      await sut.validateToken('token');

      expect(verifyToken).toHaveBeenCalledWith('token');
    });

    it('Should throw if token is invalid', async () => {
      (verifyToken as jest.Mock).mockResolvedValueOnce(null);

      const promise = sut.validateToken('token');

      await expect(promise).rejects.toThrow('Token inválido');
    });

    it('Should return decoded token', async () => {
      (verifyToken as jest.Mock).mockResolvedValueOnce({ id: 1, role: 'admin' });

      const result = await sut.validateToken('token');

      expect(result).toEqual({ id: 1, role: 'admin' });
    });
  });
});
