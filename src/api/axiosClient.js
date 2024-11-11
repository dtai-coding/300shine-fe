import axios from 'axios';

export const VITE_API_BASE_URL = 'https://localhost:7073/api';
const axiosClient = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

/* Export */
export default axiosClient;

// https://localhost:7035/api
// https://300shine.azurewebsites.net/index.html
