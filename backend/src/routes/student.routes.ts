import { Router } from 'express';

import { StudentRepository } from '../repositories/student.repository';
import { StudentService } from '../services/student.service';
import { StudentController } from '../controllers/student.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repository';

const studentRepository = new StudentRepository();
const userRepository = new UserRepository();
const studentService = new StudentService(studentRepository);
const authService = new AuthService(userRepository);
const studentController = new StudentController(studentService);
const authMiddleware = new AuthMiddleware(authService);

export default (router: Router) => {
  router.post('/students', authMiddleware.authorize, (req, res) => {
    studentController.create(req, res);
  });

  router.get('/students', authMiddleware.authorize, (req, res) => {
    studentController.list(req, res);
  });

  router.get('/students/:id', authMiddleware.authorize, (req, res) => {
    studentController.getById(req, res);
  });

  router.put('/students/:id', authMiddleware.authorize, (req, res) => {
    studentController.update(req, res);
  });

  router.delete('/students/:id', authMiddleware.authorize, (req, res) => {
    studentController.delete(req, res);
  });
};
