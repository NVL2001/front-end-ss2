import axios from 'axios';
import { toast } from "react-toastify";

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '[GET, POST, PUT, DELETE]'
};

const token = localStorage.getItem('jwt');
if (token) {
  axios.defaults.headers = {
    ...axios.defaults.headers,
    Authorization: `Bearer ${token}`
  };
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      toast.error("Bạn cần đăng nhập");
    }
    return Promise.reject(error);
  }
);

export const setAxiosAuthorizeHeader = (jwt) => {
  axios.defaults.headers = {
    ...axios.defaults.headers,
    Authorization: `Bearer ${jwt}`
  };
  localStorage.setItem("jwt", jwt);
};
