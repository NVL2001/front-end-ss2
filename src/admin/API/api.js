/* eslint-disable no-param-reassign */
/* eslint-disable quote-props */
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
<<<<<<< Updated upstream
    'content-type': 'application/json',
=======
    // 'content-type': 'application/json',
>>>>>>> Stashed changes
    'Access-Control-Allow-Origin': '*',
  },
});

axiosClient.interceptors.request.use((config) => {
  // Lấy token từ localStorage
<<<<<<< Updated upstream
  const token = localStorage.getItem('bearer_token');
=======
  const objUser = JSON.parse(localStorage.getItem('user'));
  const token = objUser.bearer_token;
  console.log("token", token);
>>>>>>> Stashed changes
  // Nếu có token, thì thêm vào request header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

<<<<<<< Updated upstream
export const api = (method, endpoint, payload) => axiosClient(endpoint, { method, data: payload })
  .then((response) => response.data)
  .catch((error) => {
    console.log(error);
  });
=======
export const api = (method, endpoint, payload) => {
  const headers = {};
  if (payload instanceof FormData) {
    // Set headers for multipart form data
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    // Set headers for application/json
    headers['Content-Type'] = 'application/json';
  }
  // console.log("payload", headers);
  const config = {
    method,
    url: endpoint,
    headers,
    data: payload
  };

  return axiosClient(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};
>>>>>>> Stashed changes
