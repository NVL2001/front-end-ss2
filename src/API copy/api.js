import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/",
  header: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",

  },
});
export const api = (method, endpoint, payload) => {
  return axiosClient(endpoint, { method: method, data: payload })
    .then((response) => {
      //   console.log("api");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
