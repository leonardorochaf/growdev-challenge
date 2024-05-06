import logger from '../log/logger';
import { generateToken } from '../utils/token.utils';
import { validatePassword } from '../utils/crypt.utils';
import { UserRepository } from '../repositories/user.repository';
import { UnauthorizedError } from '../errors/unauthoraized.error';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) { }

  async login(input: LoginInput) {
    logger.info(input, 'AuthService.login - Logging in user');
    const user = await this.userRepository.findByUsername(input.username);

    if (!user) {
      logger.error('AuthService.login - User not found');
      throw new UnauthorizedError('Credenciais inválidas');
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
}

export type LoginInput = {
  username: string;
  password: string;
};
