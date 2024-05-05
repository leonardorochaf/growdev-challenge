import request from 'supertest';
import { IBackup } from 'pg-mem';

import app from '../app';
import { DbConnection } from '../database/connection';
import { initFakePgDb } from '../mocks/database/connection.mock';
import { Student } from '../database/models/student.model';

jest.mock('../log/logger');

describe('Student routes', () => {
  let pgConnection: DbConnection;
  let backup: IBackup;

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
        .send({ ...requestBody, ra: '654321' });

      expect(status).toBe(422);
      expect(body).toEqual({
        error: 'Estudante com RA já cadastrado',
      });
    });

    it('Should return 201 on success', async () => {
      const { status, body } = await request(app)
        .post('/api/students')
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
});
