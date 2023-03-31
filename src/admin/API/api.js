import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  header: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',

  },
});
export const api = (method, endpoint, payload) => axiosClient(endpoint, { method, data: payload })
  .then((response) => response.data)
  //   console.log("api");
  .catch((error) => {
    console.log(error);
  });
