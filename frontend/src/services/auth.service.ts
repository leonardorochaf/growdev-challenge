import axios from "axios";

export const login = async (loginInfo: { username: string, password: string }) => {
  try {
    const { data } = await axios.post('http://localhost:3000/api/login', loginInfo);
    return data;
  } catch (err) {
    const formatedError = err?.response?.data?.error || 'Erro ao fazer login';
    throw new Error(formatedError);
  }
}

export const validateToken = async (token: string) => {
  try {
    const payloadBase64 = token.split('.')[1];
    const payloadDecodificado = JSON.parse(atob(payloadBase64));
    if (payloadDecodificado.exp) {
      const tempoAtualEmSegundos = Math.floor(Date.now() / 1000);
      return payloadDecodificado.exp > tempoAtualEmSegundos;
    }
    return false;
  } catch (err) {
    return false;
  }
}
