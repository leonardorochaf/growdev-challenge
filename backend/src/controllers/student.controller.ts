import { Request, Response } from 'express';

import logger from '../log/logger';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error';
import { StudentService } from '../services/student.service';
import { createStudentSchema, listStudentsSchema, updateStudentSchema } from '../validation/schemas/student.schemas';
import { Validator } from '../validation/validator';
import { NotFoundError } from '../errors/not-found.error';

export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Validator(createStudentSchema)
  async create(req: Request, res: Response) {
    logger.info('StudentController.createStudent - Creating a new student');
    try {
      const {
        name, email, ra, cpf,
      } = req.body;

      const student = await this.studentService.create({
        name, email, ra, cpf,
      });

      logger.info('StudentController.createStudent - Student created successfully');
      return res.status(201).send(student);
    } catch (error) {
      logger.error(error, 'StudentController.createStudent - Error creating a student');
      if (error instanceof UnprocessableEntityError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Não foi possível processar sua solicitação' });
    }
  }

  @Validator(listStudentsSchema)
  async list(req: Request, res: Response) {
    logger.info('StudentController.listStudents - Listing all students');
    try {
      const filter = req.query.filter as string;
      const page = req.query.page as string;

      const students = await this.studentService.list({
        filter, page: +page,
      });

      logger.info('StudentController.listStudents - Students listed successfully');
      return res.status(200).send(students);
    } catch (error) {
      logger.error(error, 'StudentController.listStudents - Error listing students');
      return res.status(500).json({ error: 'Não foi possível processar sua solicitação' });
    }
  }

  async getById(req: Request, res: Response) {
    logger.info('StudentController.getStudentById - Getting student by id');
    try {
      const { id } = req.params;

      const student = await this.studentService.getById(+id);

      logger.info('StudentController.getStudentById - Student retrieved successfully');
      return res.status(200).send(student);
    } catch (error) {
      logger.error(error, 'StudentController.getStudentById - Error getting student by id');
      if (error instanceof NotFoundError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Não foi possível processar sua solicitação' });
    }
  }

  @Validator(updateStudentSchema)
  async update(req: Request, res: Response) {
    logger.info('StudentController.updateStudent - Updating student');
    try {
      const { id } = req.params;
      const {
        name, email,
      } = req.body;

      const student = await this.studentService.update(+id, {
        name, email,
      });

      logger.info('StudentController.updateStudent - Student updated successfully');
      return res.status(200).send(student);
    } catch (error) {
      logger.error(error, 'StudentController.updateStudent - Error updating student');
      if (error instanceof NotFoundError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Não foi possível processar sua solicitação' });
    }
  }

  async delete(req: Request, res: Response) {
    logger.info('StudentController.deleteStudent - Deleting student');
    try {
      const { id } = req.params;

      await this.studentService.delete(+id);

      logger.info('StudentController.deleteStudent - Student deleted successfully');
      return res.status(204).send();
    } catch (error) {
      logger.error(error, 'StudentController.deleteStudent - Error deleting student');
      if (error instanceof NotFoundError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Não foi possível processar sua solicitação' });
    }
  }
}
