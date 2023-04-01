import axios from 'axios';
import { APIRoutes } from '../../constants/APIRoutes';

const getProductsByCategory = (categoryName) => axios.get(`${APIRoutes.GET_PRODUCT_BY_CATEGORY}/${categoryName}`);
const getAllProduct = () => axios.get(APIRoutes.GET_PRODUCTS);

export {
  getProductsByCategory,
  getAllProduct,
};
