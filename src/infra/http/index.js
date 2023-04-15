import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const setAxiosAuthorizeHeader = (jwt) => {
  axios.defaults.headers = {
    ...axios.defaults.headers,
    Authorization: `Bearer ${jwt}`
  };
};
