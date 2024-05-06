import { User } from '../database/models/user.model';
import logger from '../log/logger';
import { AbstractRepository } from './abstract.repository';

export class UserRepository extends AbstractRepository {
  async findByUsername(username: string): Promise<User | null> {
    logger.info('UserRepository.findByUsername - Getting user by username');
    const client = this.getClient(User);

    const user = await client.findOne({ where: { username }, relations: ['role'] });

    logger.info('UserRepository.findByUsername - User found');
    return user;
  }
}
