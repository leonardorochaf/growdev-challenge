import request from 'supertest';
import { IBackup } from 'pg-mem';

import app from '../app';
import { DbConnection } from '../database/connection';
import { initFakePgDb } from '../mocks/database/connection.mock';
import { Student } from '../database/models/student.model';
import { generateToken } from '../utils/token.utils';

jest.mock('../log/logger');

describe('Student routes', () => {
  let pgConnection: DbConnection;
  let backup: IBackup;
  let token: string;

  beforeAll(async () => {
    token = await generateToken({ id: 1, username: 'johndoe', role: 'admin' });
  });

  afterAll(async () => {
    await pgConnection.disconnect();
  });

  beforeEach(() => {
    backup.restore();
  });

  describe('POST /students', () => {
    const requestBody = {
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      ra: '123456',
      cpf: '11638512051',
    };

    beforeAll(async () => {
      const db = await initFakePgDb([Student]);
      pgConnection = DbConnection.getInstance();

      await pgConnection.getClient(Student).save({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '654321',
        cpf: '12345678900',
        createdAt: new Date(),
        deletedAt: undefined,
      });

      backup = db.backup();
    });

    it('Should return 400 if fields validation fails', async () => {
      const { status, body } = await request(app)
        .post('/api/students')
        .auth(token, { type: 'bearer' })
        .send({ ...requestBody, name: '' });

      expect(status).toBe(400);
      expect(body).toEqual({
        errors: {
          name: ['String must contain at least 3 character(s)'],
        },
      });
    });

    it('Should return 422 if ra already exists', async () => {
      const { status, body } = await request(app)
        .post('/api/students')
        .auth(token, { type: 'bearer' })
        .send({ ...requestBody, ra: '654321' });

      expect(status).toBe(422);
      expect(body).toEqual({
        error: 'Estudante com RA já cadastrado',
      });
    });

    it('Should return 201 on success', async () => {
      const { status, body } = await request(app)
        .post('/api/students')
        .auth(token, { type: 'bearer' })
        .send(requestBody);

      expect(status).toBe(201);
      expect(body).toEqual({
        id: expect.any(Number),
        ...requestBody,
        createdAt: expect.any(String),
        deletedAt: null,
      });
    });
  });

  describe('GET /students', () => {
    beforeAll(async () => {
      const db = await initFakePgDb([Student]);
      pgConnection = DbConnection.getInstance();

      await pgConnection.getClient(Student).save({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '654321',
        cpf: '12345678900',
        createdAt: new Date(),
        deletedAt: undefined,
      });

      backup = db.backup();
    });

    it('Should return 400 if fields validation fails', async () => {
      const { status, body } = await request(app)
        .get('/api/students?page=invalidapage')
        .auth(token, { type: 'bearer' });

      expect(status).toBe(400);
      expect(body).toEqual({
        errors: {
          page: ['Page must contain only numbers'],
        },
      });
    });

    it('Should return empty array if no students are found', async () => {
      const { status, body } = await request(app)
        .get('/api/students?sort=name&order=ASC&page=2&qnt=10')
        .auth(token, { type: 'bearer' });

      expect(status).toBe(200);
      expect(body).toEqual({
        students: [], currentPage: 2, total: 1, totalPages: 1,
      });
    });

    it('Should return 200 on success', async () => {
      const { status, body } = await request(app)
        .get('/api/students?sort=name&order=ASC&page=1&qnt=10')
        .auth(token, { type: 'bearer' });

      expect(status).toBe(200);
      expect(body).toEqual({
        students: [{
          id: expect.any(Number),
          name: 'John Doe',
          email: 'johndoe@mail.com',
          ra: '654321',
          cpf: '12345678900',
          createdAt: expect.any(String),
          deletedAt: null,
        }],
        total: 1,
        currentPage: 1,
        totalPages: 1,
      });
    });
  });

  describe('GET /students/:id', () => {
    beforeAll(async () => {
      const db = await initFakePgDb([Student]);
      pgConnection = DbConnection.getInstance();

      await pgConnection.getClient(Student).save({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '654321',
        cpf: '12345678900',
        createdAt: new Date(),
        deletedAt: undefined,
      });

      backup = db.backup();
    });

    it('Should return 404 if student is not found', async () => {
      const { status, body } = await request(app)
        .get('/api/students/2')
        .auth(token, { type: 'bearer' });

      expect(status).toBe(404);
      expect(body).toEqual({
        error: 'Estudante não encontrado',
      });
    });

    it('Should return 200 on success', async () => {
      const { status, body } = await request(app)
        .get('/api/students/1')
        .auth(token, { type: 'bearer' });

      expect(status).toBe(200);
      expect(body).toEqual({
        id: expect.any(Number),
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '654321',
        cpf: '12345678900',
        createdAt: expect.any(String),
        deletedAt: null,
      });
    });
  });

  describe('PUT /students/:id', () => {
    const requestBody = {
      name: 'John Doe 2',
      email: 'johndoe2@mail.com',
    };

    beforeAll(async () => {
      const db = await initFakePgDb([Student]);
      pgConnection = DbConnection.getInstance();

      await pgConnection.getClient(Student).save({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '654321',
        cpf: '12345678900',
        createdAt: new Date(),
        deletedAt: undefined,
      });

      backup = db.backup();
    });

    it('Should return 400 if fields validation fails', async () => {
      const { status, body } = await request(app)
        .put('/api/students/1')
        .auth(token, { type: 'bearer' })
        .send({ ...requestBody, name: '' });

      expect(status).toBe(400);
      expect(body).toEqual({
        errors: {
          name: ['String must contain at least 3 character(s)'],
        },
      });
    });

    it('Should return 404 if student is not found', async () => {
      const { status, body } = await request(app)
        .put('/api/students/2')
        .auth(token, { type: 'bearer' })
        .send(requestBody);

      expect(status).toBe(404);
      expect(body).toEqual({
        error: 'Estudante não encontrado',
      });
    });

    it('Should return 200 on success', async () => {
      const { status, body } = await request(app)
        .put('/api/students/1')
        .auth(token, { type: 'bearer' })
        .send(requestBody);

      expect(status).toBe(200);
      expect(body).toEqual({
        id: 1,
        name: 'John Doe 2',
        email: 'johndoe2@mail.com',
        ra: '654321',
        cpf: '12345678900',
        createdAt: expect.any(String),
        deletedAt: null,
      });
    });
  });

  describe('DELETE /students/:id', () => {
    beforeAll(async () => {
      const db = await initFakePgDb([Student]);
      pgConnection = DbConnection.getInstance();

      await pgConnection.getClient(Student).save({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '654321',
        cpf: '12345678900',
        createdAt: new Date(),
        deletedAt: undefined,
      });

      backup = db.backup();
    });

    it('Should return 404 if student is not found', async () => {
      const { status, body } = await request(app)
        .delete('/api/students/2')
        .auth(token, { type: 'bearer' });

      expect(status).toBe(404);
      expect(body).toEqual({
        error: 'Estudante não encontrado',
      });
    });

    it('Should return 204 on success', async () => {
      const { status } = await request(app)
        .delete('/api/students/1')
        .auth(token, { type: 'bearer' });

      expect(status).toBe(204);
    });
  });
});
