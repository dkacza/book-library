import axios from 'axios';

export const API_URL = 'https://book-library-api-cmj4.onrender.com';

export default axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
