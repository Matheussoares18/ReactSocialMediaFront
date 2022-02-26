import axios from 'axios';
import { config } from '../config';

const api = axios.create({
  baseURL: `${config.host}`,
  headers: {
    authorization: localStorage.getItem('token'),
  },
  timeout: 15000,
});

export default api;
