import axios from 'axios';
import { APIRoutes } from '../../constants/APIRoutes';

const login = (payload) => axios.post(APIRoutes.AUTH_LOGIN, payload);

const register = (payload) => axios.post(APIRoutes.AUTH_REGISTER, payload);

export {
  login,
  register,
};
