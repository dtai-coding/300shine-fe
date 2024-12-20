import axios from 'axios';


const local = 'https://localhost:7073/api'
const server = 'https://300shine.azurewebsites.net/api'

export const VITE_API_BASE_URL = local;
const axiosClient = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

/* Export */
export default axiosClient;

// https://localhost:7073/index.html
// https://300shine.azurewebsites.net/index.html
