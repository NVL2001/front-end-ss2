import axios from "axios";
const apiURL = "http://localhost:8080/api";

export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

export const isAdmin = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).user.role === 1
    : false;

export const loginReq = async ({ username, password }) => {
  const data = { username, password };
  try {
    let res = await axios.post(`${apiURL}/auth/login`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupReq = async ({ first_name, last_name, phone_number, username, password, cPassword }) => {
  const data = { first_name, last_name, phone_number, username, password, cPassword };
  try {
    let res = await axios.post(`${apiURL}/auth/register`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
