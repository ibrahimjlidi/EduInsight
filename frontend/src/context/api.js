import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem('eduUser');
  if (storedUser) {
    const parsed = JSON.parse(storedUser);
    if (parsed?.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('eduUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
