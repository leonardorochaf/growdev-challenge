import { Request, Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';

import { StudentService } from '../services/student.service';
import { StudentController } from './student.controller';
import { UnprocessableEntityError } from '../errors/unprocessable-entity.error';
import { NotFoundError } from '../errors/not-found.error';

jest.mock('../validation/validator');

describe('StudentController', () => {
  const studentService = {
    create: jest.fn(),
    list: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as jest.Mocked<StudentService>;

  let sut: StudentController;

  beforeEach(() => {
    sut = new StudentController(studentService);
  });

  describe('create', () => {
    let request: Request;
    let response: Response;

    const requestBody = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      ra: '123456',
      cpf: '12345678900',
    };

    beforeEach(() => {
      studentService.create.mockResolvedValue({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
        createdAt: new Date(),
        deletedAt: undefined,
      });
      request = getMockReq({ body: requestBody });
      response = getMockRes().res;
    });

    it('Should call studentService.create with correct value', async () => {
      await sut.create(request, response);

      expect(studentService.create).toHaveBeenCalledWith({
        name: requestBody.name, email: requestBody.email, ra: requestBody.ra, cpf: requestBody.cpf,
      });
    });

    it('Should return 422 if studentService.create throws UnprocessableEntityError', async () => {
      studentService.create.mockRejectedValueOnce(new UnprocessableEntityError('UnprocessableEntityError'));

      await sut.create(request, response);

      expect(response.status).toHaveBeenCalledWith(422);
      expect(response.json).toHaveBeenCalledWith({ error: 'UnprocessableEntityError' });
    });

    it('Should return 500 if studentService.create throws', async () => {
      studentService.create.mockRejectedValueOnce(new Error());

      await sut.create(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ error: 'Não foi possível processar sua solicitação' });
    });

    it('Should return 201 with student created', async () => {
      await sut.create(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.send).toHaveBeenCalledWith({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
        createdAt: expect.any(Date),
        deletedAt: undefined,
      });
    });
  });

  describe('list', () => {
    let request: Request;
    let response: Response;

    beforeEach(() => {
      studentService.list.mockResolvedValue([{
        id: 1,
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
        createdAt: new Date(),
        deletedAt: undefined,
      }]);
      request = getMockReq({
        query: {
          filter: 'filter', sort: 'name', order: 'ASC', page: '1', qnt: '10',
        },
      });
      response = getMockRes().res;
    });

    it('Should call studentService.list with correct values', async () => {
      await sut.list(request, response);

      expect(studentService.list).toHaveBeenCalledWith({
        filter: 'filter', sortParam: 'name', sortOrder: 'ASC', page: 1, qnt: 10,
      });
    });

    it('Should return 500 if studentService.list throws', async () => {
      studentService.list.mockRejectedValueOnce(new Error());

      await sut.list(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ error: 'Não foi possível processar sua solicitação' });
    });

    it('Should return 200 with students listed', async () => {
      await sut.list(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith([{
        id: 1,
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
        createdAt: expect.any(Date),
        deletedAt: undefined,
      }]);
    });
  });

  describe('getById', () => {
    let request: Request;
    let response: Response;

    beforeEach(() => {
      studentService.getById.mockResolvedValue({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
        createdAt: new Date(),
        deletedAt: undefined,
      });
      request = getMockReq({ params: { id: '1' } });
      response = getMockRes().res;
    });

    it('Should call studentService.getById with correct value', async () => {
      await sut.getById(request, response);

      expect(studentService.getById).toHaveBeenCalledWith(1);
    });

    it('Should return 404 if studentService.getById throws NotFoundError', async () => {
      studentService.getById.mockRejectedValueOnce(new NotFoundError('NotFoundError'));

      await sut.getById(request, response);

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ error: 'NotFoundError' });
    });

    it('Should return 500 if studentService.getById throws', async () => {
      studentService.getById.mockRejectedValueOnce(new Error());

      await sut.getById(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ error: 'Não foi possível processar sua solicitação' });
    });

    it('Should return 200 with student retrieved', async () => {
      await sut.getById(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
        createdAt: expect.any(Date),
        deletedAt: undefined,
      });
    });
  });

  describe('update', () => {
    let request: Request;
    let response: Response;

    const requestBody = {
      name: 'John Doe 2',
      email: 'johndoe2@mail.com',
    };

    beforeEach(() => {
      studentService.update.mockResolvedValue({
        id: 1,
        name: 'John Doe 2',
        email: 'johndoe2@mail.com',
        ra: '123456',
        cpf: '12345678900',
        createdAt: expect.any(Date),
        deletedAt: undefined,
      });
      request = getMockReq({ params: { id: '1' }, body: requestBody });
      response = getMockRes().res;
    });

    it('Should call studentService.update with correct value', async () => {
      await sut.update(request, response);

      expect(studentService.update).toHaveBeenCalledWith(1, {
        name: requestBody.name, email: requestBody.email,
      });
    });

    it('Should return 404 if studentService.update throws NotFoundError', async () => {
      studentService.update.mockRejectedValueOnce(new NotFoundError('NotFoundError'));

      await sut.update(request, response);

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ error: 'NotFoundError' });
    });

    it('Should return 500 if studentService.update throws', async () => {
      studentService.update.mockRejectedValueOnce(new Error());

      await sut.update(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ error: 'Não foi possível processar sua solicitação' });
    });

    it('Should return 200 with student updated', async () => {
      await sut.update(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith({
        id: 1,
        name: 'John Doe 2',
        email: 'johndoe2@mail.com',
        ra: '123456',
        cpf: '12345678900',
        createdAt: expect.any(Date),
        deletedAt: undefined,
      });
    });
  });

  describe('delete', () => {
    let request: Request;
    let response: Response;

    beforeEach(() => {
      request = getMockReq({ params: { id: '1' } });
      response = getMockRes().res;
    });

    it('Should call studentService.delete with correct value', async () => {
      await sut.delete(request, response);

      expect(studentService.delete).toHaveBeenCalledWith(1);
    });

    it('Should return 404 if studentService.delete throws NotFoundError', async () => {
      studentService.delete.mockRejectedValueOnce(new NotFoundError('NotFoundError'));

      await sut.delete(request, response);

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ error: 'NotFoundError' });
    });

    it('Should return 500 if studentService.delete throws', async () => {
      studentService.delete.mockRejectedValueOnce(new Error());

      await sut.delete(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ error: 'Não foi possível processar sua solicitação' });
    });

    it('Should return 204 with student deleted', async () => {
      await sut.delete(request, response);

      expect(response.status).toHaveBeenCalledWith(204);
      expect(response.send).toHaveBeenCalledWith();
    });
  });
});
