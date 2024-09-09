import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-tennis.fly.dev/',
  // Aquí puedes añadir más configuraciones como headers por defecto
});

export default api;