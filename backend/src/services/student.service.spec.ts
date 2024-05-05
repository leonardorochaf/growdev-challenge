import { StudentRepository } from '../repositories/student.repository';
import { StudentService } from './student.service';

jest.mock('../repositories/student.repository', () => ({
  StudentRepository: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
    getByRA: jest.fn(),
    getAll: jest.fn(),
  })),
}));
jest.mock('../log/logger');

describe('StudentService', () => {
  const mockStudentRepository = new StudentRepository() as jest.Mocked<StudentRepository>;
  let sut: StudentService;

  beforeEach(() => {
    sut = new StudentService(mockStudentRepository);
  });

  describe('create', () => {
    beforeAll(() => {
      mockStudentRepository.getByRA.mockResolvedValue(null);
      mockStudentRepository.save.mockResolvedValue({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
        createdAt: new Date(),
        deletedAt: undefined,
      });
    });

    it('Should call getByRa with correct value', async () => {
      await sut.create({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
      });

      expect(mockStudentRepository.getByRA).toHaveBeenCalledWith('123456');
    });

    it('Should throw if student with ra already exists', async () => {
      mockStudentRepository.getByRA.mockResolvedValueOnce({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
        createdAt: new Date(),
        deletedAt: undefined,
      });

      const promise = sut.create({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
      });

      await expect(promise).rejects.toThrow('Estudante com RA já cadastrado');
    });

    it('Should call save with correct value', async () => {
      await sut.create({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
      });

      expect(mockStudentRepository.save).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
      });
    });

    it('Should throw if save throws', async () => {
      mockStudentRepository.save.mockRejectedValueOnce(new Error('Test Error'));

      const promise = sut.create({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
      });

      await expect(promise).rejects.toThrow('Test Error');
    });

    it('Should return the created student', async () => {
      const student = await sut.create({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
      });

      expect(student).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
        createdAt: expect.any(Date),
      });
    });
  });

  describe('list', () => {
    beforeAll(() => {
      mockStudentRepository.getAll.mockResolvedValue([{
        id: 1,
        name: 'John Doe',
        email: 'johndoe@mail.com',
        ra: '123456',
        cpf: '12345678900',
        createdAt: new Date(),
        deletedAt: undefined,
      }]);
    });

    it('Should call getAll with correct values', async () => {
      await sut.list({
        filter: 'John',
        sortParam: 'name',
        sortOrder: 'ASC',
        page: 1,
        qnt: 10,
      });

      expect(mockStudentRepository.getAll).toHaveBeenCalledWith(10, 0, 'name', 'ASC', 'John');
    });

    it('Should throw if getAll throws', async () => {
      mockStudentRepository.getAll.mockRejectedValueOnce(new Error('Test Error'));

      const promise = sut.list({
        filter: 'John',
        sortParam: 'name',
        sortOrder: 'ASC',
        page: 1,
        qnt: 10,
      });

      await expect(promise).rejects.toThrow('Test Error');
    });

    it('Should return the students', async () => {
      const students = await sut.list({
        filter: 'John',
        sortParam: 'name',
        sortOrder: 'ASC',
        page: 1,
        qnt: 10,
      });

      expect(students).toEqual([{
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
});
