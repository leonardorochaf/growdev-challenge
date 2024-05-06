import axios from 'axios'

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
