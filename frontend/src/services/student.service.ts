import axios from 'axios'

export type Student = {
  id: number,
  name: string,
  email: string,
  ra: string,
  cpf: string,
}

export type SearchParams = {
  page: number,
  filter?: string,
}

export const getStudents = async (params: SearchParams) => {
  let query = `page=${params.page}`
  if (params.filter) {
    query += `&filter=${params.filter}`
  }
  try {
    const { data } = await axios.get(`http://localhost:3000/api/students?${query}`);

    return data;
  } catch (err) {
    const formatedError = err?.response?.data?.error || 'Erro ao buscar estudantes';
    throw new Error(formatedError);
  }
}

export const createStudent = async (student: Omit<Student, "id">) => {
  try {
    const { data } = await axios.post('http://localhost:3000/api/students', student);
    return data;
  } catch (err) {
    const formatedError = err?.response?.data?.error || 'Erro ao criar estudante';
    throw new Error(formatedError);
  }
}

export const getStudent = async (id: number) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/students/${id}`);

    return data;
  } catch (err) {
    const formatedError = err?.response?.data?.error || 'Erro ao buscar estudante';
    throw new Error(formatedError);
  }
}

export const updateStudent = async (student: Omit<Student, "ra" | "cpf">) => {
  try {
    const { data } = await axios.put(`http://localhost:3000/api/students/${student.id}`, student);

    return data;
  } catch (err) {
    const formatedError = err?.response?.data?.error || 'Erro ao atualizar estudante';
    throw new Error(formatedError);
  }
}

export const deleteStudent = async (id: number) => {
  try {
    await axios.delete(`http://localhost:3000/api/students/${id}`);
  } catch (err) {
    const formatedError = err?.response?.data?.error || 'Erro ao deletar estudante';
    throw new Error(formatedError);
  }
}
