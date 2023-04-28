/* eslint-disable no-param-reassign */
/* eslint-disable quote-props */
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosClient.interceptors.request.use((config) => {
  // Lấy token từ localStorage
  const token = localStorage.getItem('bearer_token');
  // Nếu có token, thì thêm vào request header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const api = (method, endpoint, payload) => axiosClient(endpoint, { method, data: payload })
  .then((response) => response.data)
  .catch((error) => {
    console.log(error);
  });
