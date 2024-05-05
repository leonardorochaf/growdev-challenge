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

  async getAll(limit: number, offset: number, sortParam: string, sortOrder: 'ASC' | 'DESC', filter?: string): Promise<Student[]> {
    logger.info('StudentRepository.getAll - Getting all students');
    const client = this.getClient(Student);

    const query = client.createQueryBuilder('student');

    if (filter) {
      query.where(
        'student.name LIKE :filter OR student.email LIKE :filter OR student.ra LIKE :filter OR student.cpf LIKE :filter',
        { filter: `%${filter}%` },
      );
    }

    const students = query.orderBy(`student.${sortParam} `, sortOrder)
      .take(limit)
      .skip(offset)
      .getMany();

    logger.info('StudentRepository.getAll - Students found');
    return students;
  }
}
