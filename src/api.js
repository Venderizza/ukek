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

const target = import.meta.env.VITE_API_PROXY_TARGET;

api.interceptors.request.use((config) => {
  const fullUrl = target ? target + config.url : config.url;
  console.log("[REQUEST]", config.method?.toUpperCase(), fullUrl, config.data);
  return config;
});

api.interceptors.response.use(
  (response) => {
    const fullUrl = target ? target + response.config.url : response.config.url;
    console.log("[RESPONSE]", response.status, fullUrl, response.data);
    return response;
  },
  (error) => {
    const fullUrl = target ? target + error.config?.url : error.config?.url;
    console.error("[ERROR]", error.response?.status, fullUrl, error.response?.data || error.message);
    return Promise.reject(error);
  }
);
