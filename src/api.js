import axios from 'axios';

const api = axios.create({
  baseURL: "/",
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export default api;





