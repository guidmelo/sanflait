import axios from 'axios';

const BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '') || 'http://localhost:3333/api';

const api = axios.create({ baseURL: BASE });

api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('sanflait-auth');
    if (raw) {
      const { state } = JSON.parse(raw);
      if (state?.token && !state.token.startsWith('demo-')) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    }
  } catch {}
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      try {
        const raw = localStorage.getItem('sanflait-auth');
        if (raw) {
          const { state } = JSON.parse(raw);
          if (state?.token && !state.token.startsWith('demo-')) {
            localStorage.removeItem('sanflait-auth');
            window.location.href = '/login';
          }
        }
      } catch {}
    }
    return Promise.reject(err);
  },
);

export default api;
