import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_PROXY_TARGET,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export default api;


