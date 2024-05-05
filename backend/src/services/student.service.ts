import logger from '../log/logger';
import { Student } from '../database/models/student.model';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error';
import { NotFoundError } from '../errors/not-found.error';
import { StudentRepository } from '../repositories/student.repository';

export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) { }

  async create(input: CreateStudentInput): Promise<Student> {
    logger.info(input, 'StudentService.create - Creating a new student');
    const student = await this.studentRepository.getByRA(input.ra);

    if (student) {
      logger.error(input, 'StudentService.create - Student with RA already exists');
      throw new UnprocessableEntityError('Estudante com RA já cadastrado');
    }
    const createdStudent = await this.studentRepository.save({ ...input });

    logger.info(createdStudent, 'StudentService.create - Student created successfully');
    return createdStudent;
  }

  async list(input: ListStudentsInput): Promise<Student[]> {
    logger.info('StudentService.list - Listing all students');
    const limit = input.qnt;
    const offset = (input.page - 1) * input.qnt;

    const students = await this.studentRepository
      .getAll(limit, offset, input.sortParam, input.sortOrder, input.filter);

    logger.info(students, 'StudentService.list - Students listed successfully');
    return students;
  }

  async getById(id: number): Promise<Student> {
    logger.info({ id }, 'StudentService.get - Getting student by id');
    const student = await this.studentRepository.getById(id);

    if (!student) {
      logger.error({ id }, 'StudentService.get - Student not found');
      throw new NotFoundError('Estudante não encontrado');
    }

    logger.info(student, 'StudentService.get - Student retrieved successfully');
    return student;
  }

  async update(id: number, input: UpdateStudentInput): Promise<Student> {
    logger.info({ id, input }, 'StudentService.update - Updating student');
    const student = await this.studentRepository.getById(id);

    if (!student) {
      logger.error({ id }, 'StudentService.update - Student not found');
      throw new NotFoundError('Estudante não encontrado');
    }

    const updateData = {
      ...student,
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.email !== undefined ? { email: input.email } : {}),
    };

    const updatedStudent = await this.studentRepository.save(updateData);

    logger.info(updatedStudent, 'StudentService.update - Student updated successfully');
    return updatedStudent;
  }

  async delete(id: number): Promise<void> {
    logger.info({ id }, 'StudentService.delete - Deleting student');
    const student = await this.studentRepository.getById(id);

    if (!student) {
      logger.error({ id }, 'StudentService.delete - Student not found');
      throw new NotFoundError('Estudante não encontrado');
    }

    await this.studentRepository.delete(id);

    logger.info('StudentService.delete - Student deleted successfully');
  }
}

export type CreateStudentInput = {
  name: string
  email: string
  ra: string
  cpf: string
};

export type ListStudentsInput = {
  filter?: string
  sortParam: 'name' | 'email' | 'ra' | 'cpf'
  sortOrder: 'ASC' | 'DESC'
  page: number
  qnt: number
};

export type UpdateStudentInput = {
  name?: string
  email?: string
};
