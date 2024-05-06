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
  const { data } = await axios.get(`http://localhost:3000/api/students?${query}`);

  return data;
}

export const createStudent = async (student: Omit<Student, "id">) => {
  const { data } = await axios.post('http://localhost:3000/api/students', student);

  return data;
}