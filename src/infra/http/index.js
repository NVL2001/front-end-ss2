import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
