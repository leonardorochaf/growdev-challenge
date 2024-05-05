import logger from '../log/logger';
import { Student } from '../database/models/student.model';
import { AbstractRepository } from './abstract.repository';

export class StudentRepository extends AbstractRepository {
  async save(student: Omit<Student, 'id' | 'createdAt'>): Promise<Student> {
    logger.info('StudentRepository.save - Saving a new student');
    const client = this.getClient(Student);

    logger.info('StudentRepository.save - Student saved successfully');
    return client.save(student);
  }

  async getByRA(ra: string): Promise<Student | null> {
    logger.info('StudentRepository.getByRA - Getting student by RA');
    const client = this.getClient(Student);

    logger.info('StudentRepository.getByRA - Student found');
    return client.findOne({ where: { ra } });
  }
}
