import { Request, Response } from 'express';

import logger from '../log/logger';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error';
import { StudentService } from '../services/student.service';
import { createStudentSchema } from '../validation/schemas/student.schemas';
import { Validator } from '../validation/validator';

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
}
