import axios from 'axios';

if (import.meta.env.PROD) {
  axios.defaults.baseURL = 'https://backend-tennis.fly.dev/';
} else {
  axios.defaults.baseURL = 'http://localhost:8080/';
}

const api = axios.create({
  baseURL: axios.defaults.baseURL,
  // Aquí puedes añadir más configuraciones como headers por defecto
});

export default api;