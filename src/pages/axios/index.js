import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4001'
    : 'https://eid-ul-fitr.onrender.com';
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'x-www-form-urlencoded',
    'Content-Type': 'application/json',
  },
  // withCredentials: true
});
