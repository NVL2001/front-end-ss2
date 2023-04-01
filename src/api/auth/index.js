import axios from 'axios';
import { APIRoutes } from '../../constants/APIRoutes';

const login = (payload) => axios.post(APIRoutes.AUTH_LOGIN, payload);

const register = (payload) => axios.post(APIRoutes.AUTH_REGISTER, payload);

export {
  login,
  register,
};
// export const isAuthenticate = () => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     return true;
//   }
//   return false;
// };

// export const isAdmin = () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   if (user && user.role === 'admin') {
//     return true;
//   }
//   return false;
// }
