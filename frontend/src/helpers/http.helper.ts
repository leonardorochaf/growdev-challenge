import axios from "axios";

import router from "../router";

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return config;
})

api.interceptors.response.use((response) => {
  return response;
}, (error) => {

  if (error?.response?.status === 401 || error?.response?.status === 403) {
    localStorage.removeItem('token');

    const formatedError = error?.response?.data?.error || 'Token expirado ou inválido';
    router.push({ name: 'Login', replace: true, params: { isAuthError: "true", errorMessage: formatedError } })
  }
  return Promise.reject(error);
})

export default api;
