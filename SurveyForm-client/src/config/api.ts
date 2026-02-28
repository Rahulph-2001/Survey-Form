
import axios from 'axios';
import { ROUTES, API_ROUTES } from './routes';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url as string | undefined;
    const isMeEndpoint = requestUrl?.includes(API_ROUTES.AUTH.ME);

    if (error.response?.status === 401 && !isMeEndpoint) {
      window.location.href = ROUTES.LOGIN;
    }
    return Promise.reject(error);
  }
);

export default api;
