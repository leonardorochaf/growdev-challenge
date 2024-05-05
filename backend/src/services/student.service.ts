import logger from '../log/logger';
import { Student } from '../database/models/student.model';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error';
import { StudentRepository } from '../repositories/student.repository';

export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) { }

  async create(input: CreateStudentInput): Promise<Student> {
    logger.info(input, 'StudentService.create - Creating a new student');
    const student = await this.studentRepository.getByRA(input.ra);

    if (student) {
      throw new UnprocessableEntityError('Estudante com RA já cadastrado');
    }
    const createdStudent = await this.studentRepository.save({ ...input });

    logger.info(createdStudent, 'StudentService.create - Student created successfully');
    return createdStudent;
  }
}

export type CreateStudentInput = {
  name: string
  email: string
  ra: string
  cpf: string
};
