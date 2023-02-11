import axios from 'axios';

// export const BASE_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:4001/api/v1'
//     : 'https://eid-ul-fitr.onrender.com/api/v1';
export const BASE_URL = 'https://eid-ul-fitr.onrender.com/api/v1';
export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'x-www-form-urlencoded',
    'Content-Type': 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'x-www-form-urlencoded',
    'Content-Type': 'application/json',
  },
  // withCredentials: true
});
