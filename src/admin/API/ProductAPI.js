/* eslint-disable import/order */
/* eslint-disable max-len */
import { api } from './api';
import FormData from 'form-data';

// get listProduct API
const getListProductAPI = () => api('GET', 'product/products', null);

const getProductByIdAPI = (id) => api('GET', `product/get/${id}`, null);

// Add New Product
const addProductNewAPI = (ProductNew) => {
  const body = new FormData();
  // eslint-disable-next-line no-plusplus, no-restricted-syntax
  if (ProductNew.images && ProductNew.images instanceof File) {
    body.append('images', ProductNew.images);
  }
  body.append("name", ProductNew.name);
  body.append("description", ProductNew.description);
  body.append("price", ProductNew.price);
  body.append("quantity", ProductNew.quantity);
  body.append("categoryName", ProductNew.categoryName);
  return api('POST', 'product/create-product', body);
};

// Delete Product
const deleteProductAPI = (id) => {
  const url = `product/delete-product?productId=${id}`;
  return api('POST', url, null, null);
};

// Update Product
const updateProductAPI = (productUpdate) => {
  const url = `products/${productUpdate.id}`;
  return api('PUT', url, productUpdate);
};
export {
  getListProductAPI, addProductNewAPI, deleteProductAPI, updateProductAPI, getProductByIdAPI
};
