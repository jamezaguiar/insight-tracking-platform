import axios from 'axios';

const api = axios.create({
  baseURL: 'https://insight-tracking-platform.herokuapp.com/api',
});

export default api;
