import axios from 'axios';

export const instance = axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn('[API Instance] 401 Unauthorized - возможно требуется повторная авторизация');
    }

    return Promise.reject(error);
  }
);
