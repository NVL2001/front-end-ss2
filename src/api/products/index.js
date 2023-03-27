import axios from 'axios';
import { APIRoutes } from '../../constants/APIRoutes';

const getProductsByCategory = (categoryName) => axios.get(`${APIRoutes.GET_PRODUCT_BY_CATEGORY}/${categoryName}`);

export {
  getProductsByCategory,
};
