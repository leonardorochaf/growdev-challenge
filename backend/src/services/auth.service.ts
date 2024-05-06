import logger from '../log/logger';
import { generateToken, verifyToken } from '../utils/token.utils';
import { validatePassword } from '../utils/crypt.utils';
import { UserRepository } from '../repositories/user.repository';
import { UnauthorizedError } from '../errors/unauthoraized.error';
import { ForbiddenError } from '../errors/forbidden.error';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) { }

  async login(input: LoginInput) {
    logger.info(input, 'AuthService.login - Logging in user');
    const user = await this.userRepository.findByUsername(input.username);

    if (!user) {
      logger.error('AuthService.login - User not found');
      throw new UnauthorizedError('Credenciais inválidas');
    }

    if (user.role.name !== 'admin') {
      logger.error('AuthService.login - User is not an admin');
      throw new ForbiddenError('Usuário não possui permissão para acessar este recurso');
    }

    logger.info('AuthService.login - Validating password');
    const isValidPassword = await validatePassword(input.password, user.password);
    if (!isValidPassword) {
      logger.error('AuthService.login - Invalid password');
      throw new UnauthorizedError('Credenciais inválidas');
    }

    logger.info('AuthService.login - Generating token');
    const token = await generateToken({ id: user.id, role: user.role.name });

    logger.info('AuthService.login - User logged in successfully');
    return { token };
  }

  async validateToken(token: string) {
    logger.info('AuthService.validateToken - Validating token');
    const decodedToken = await verifyToken(token);

    if (!decodedToken) {
      logger.error('AuthService.validateToken - Invalid token');
      throw new UnauthorizedError('Token inválido');
    }

    logger.info('AuthService.validateToken - Token validated successfully');
    return decodedToken;
  }
}

export type LoginInput = {
  username: string;
  password: string;
};
