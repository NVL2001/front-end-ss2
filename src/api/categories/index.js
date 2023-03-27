import axios from 'axios';
import { APIRoutes } from '../../constants/APIRoutes';

const getCategories = () => axios.get(APIRoutes.GET_CATEGORIES);

export {
  getCategories,
};
