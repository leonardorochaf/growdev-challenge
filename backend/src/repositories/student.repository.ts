/* eslint-disable no-param-reassign */
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

    const student = await client.findOne({ where: { ra }, withDeleted: true });

    logger.info('StudentRepository.getByRA - Student found');
    return student;
  }

  async getAll(offset: number, filter?: string): Promise<[Student[], number]> {
    logger.info('StudentRepository.getAll - Getting all students');
    const client = this.getClient(Student);

    const query = client.createQueryBuilder('student');

    if (filter) {
      query.where(
        'student.name LIKE :filter OR student.email LIKE :filter OR student.ra LIKE :filter OR student.cpf LIKE :filter',
        { filter: `%${filter}%` },
      );
    }

    const data = await query.take(15).skip(offset).getManyAndCount();

    logger.info('StudentRepository.getAll - Students found');
    return data;
  }

  async getById(id: number): Promise<Student | null> {
    logger.info('StudentRepository.getById - Getting student by ID');
    const client = this.getClient(Student);

    const student = await client.findOne({ where: { id } });

    logger.info('StudentRepository.getById - Student found');
    return student;
  }

  async delete(id: number): Promise<void> {
    logger.info('StudentRepository.delete - Deleting student');
    const client = this.getClient(Student);

    await client.softDelete(id);

    logger.info('StudentRepository.delete - Student deleted');
  }
}
