import { Router } from 'express';

import { StudentRepository } from '../repositories/student.repository';
import { StudentService } from '../services/student.service';
import { StudentController } from '../controllers/student.controller';

const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

export default (router: Router) => {
  router.post('/students', (req, res) => {
    studentController.create(req, res);
  });

  router.get('/students', (req, res) => {
    studentController.list(req, res);
  });

  router.get('/students/:id', (req, res) => {
    studentController.getById(req, res);
  });
};
