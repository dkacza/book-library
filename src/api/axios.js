import axios from 'axios';

// Uncomment the second value if you want to use local backend.
export let API_URL = 'https://book-library-api-1g5j.onrender.com';
// API_URL = 'http://localhost:8000'

export default axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});
