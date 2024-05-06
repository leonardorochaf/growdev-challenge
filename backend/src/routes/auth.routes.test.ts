import request from 'supertest';
import { IBackup } from 'pg-mem';

import app from '../app';
import { DbConnection } from '../database/connection';
import { initFakePgDb } from '../mocks/database/connection.mock';
import { User } from '../database/models/user.model';
import { Role } from '../database/models/role.model';

jest.mock('../log/logger');

describe('Auth Routes', () => {
  let pgConnection: DbConnection;
  let backup: IBackup;

  afterAll(async () => {
    await pgConnection.disconnect();
  });

  beforeEach(() => {
    backup.restore();
  });

  describe('POST /login', () => {
    const requestBody = {
      username: 'johndoe',
      password: 'password',
    };

    beforeAll(async () => {
      const db = await initFakePgDb([User, Role]);
      pgConnection = DbConnection.getInstance();

      await pgConnection.getClient(Role).save({
        id: 1,
        name: 'admin',
      });
      await pgConnection.getClient(User).save({
        username: 'johndoe',
        password: '$2a$10$nWMeZPXeNhpMkSRTcOeR2OMLxRmQE2A743pTPqKiJ5hll1aj.zV0a',
        role: {
          id: 1,
        },
      });

      backup = db.backup();
    });

    it('Should return 400 if fields validation fails', async () => {
      const { status, body } = await request(app)
        .post('/api/login')
        .send({ ...requestBody, username: '' });

      expect(status).toBe(400);
      expect(body).toEqual({
        errors: {
          username: ['String must contain at least 3 character(s)'],
        },
      });
    });

    it('Should return 401 if user not found', async () => {
      const { status, body } = await request(app)
        .post('/api/login')
        .send({ ...requestBody, username: 'username' });

      expect(status).toBe(401);
      expect(body).toEqual({ message: 'Credenciais inválidas' });
    });

    it('Should return 401 if password is invalid', async () => {
      const { status, body } = await request(app)
        .post('/api/login')
        .send({ ...requestBody, password: 'invalidpassword' });

      expect(status).toBe(401);
      expect(body).toEqual({ message: 'Credenciais inválidas' });
    });

    it('Should return 200 with token', async () => {
      const { status, body } = await request(app)
        .post('/api/login')
        .send(requestBody);

      expect(status).toBe(200);
      expect(body).toEqual({ token: expect.any(String) });
    });
  });
});
