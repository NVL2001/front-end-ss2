/* eslint-disable no-param-reassign */
/* eslint-disable quote-props */
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    // 'content-type': 'application/json',.
    'Access-Control-Allow-Origin': '*',
  },
});

axiosClient.interceptors.request.use((config) => {
  // Lấy token từ localStorage
  const objUser = JSON.parse(localStorage.getItem('user'));
  const token = objUser.bearer_token;
  // Nếu có token, thì thêm vào request header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// eslint-disable-next-line consistent-return
export const api = async (method, endpoint, payload) => {
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

  try {
    const response = await axiosClient(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
