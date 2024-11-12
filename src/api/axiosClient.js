import axios from 'axios';

const localPhat = 'https://localhost:7073/api'
const local = 'http://localhost:5035/api'
const server = 'https://300shine.azurewebsites.net/api'

export const VITE_API_BASE_URL = server;
const axiosClient = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

/* Export */
export default axiosClient;

// https://localhost:7073/api
// https://300shine.azurewebsites.net/index.html
