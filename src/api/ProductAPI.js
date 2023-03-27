import { api } from './api';

// get listProduct API
const getListProductAPI = () => api('GET', 'product/products', null);
// product by category
const getProductByCategory = async (categoryName) => api('GET', `product/get-product-by-category/${categoryName}`, null);

// single product
const getProduct = async (id) => api('GET', `product/get-product/${id}`, null);

// export
export { getListProductAPI, getProductByCategory, getProduct };
