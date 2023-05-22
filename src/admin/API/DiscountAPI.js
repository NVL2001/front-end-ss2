import { api } from './api';

// get listDiscount API
const getListDiscountAPI = () => api('GET', 'discount/all', null);

const updateDiscountAPI = (newDiscount) => {
  const url = `discount/update`;
  return api('POST', url, newDiscount);
};

const createDiscountAPI = (newDiscount) => {
  const url = `discount/create`;
  return api('POST', url, newDiscount);
};

const getAppliedProductsAPI = (discount) => {
  const url = `discount/applied-products/${discount}`;
  return api('GET', url, null);
};

const deleteDiscountProductAPI = (product, discount) => {
  const url = `discount/remove-applied-product?product=${product}&discount=${discount}`;
  return api('POST', url, null);
};

const addProdToDiscountAPI = (body) => {
  const url = `discount/add-applied-product`;
  return api('POST', url, body);
};

export {
  // eslint-disable-next-line max-len
  getListDiscountAPI, updateDiscountAPI, createDiscountAPI, getAppliedProductsAPI, deleteDiscountProductAPI, addProdToDiscountAPI
};
