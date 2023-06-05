import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export async function getApi(url: string) {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) return error.message;
    else return 'Error desconocido';
  }
}

export default api;
