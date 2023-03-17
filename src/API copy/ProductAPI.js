import { api } from "./api";

// get listProduct API
const getListProductAPI = () => {
  return api("GET", "product/products", null);
};

// Add New Product
const addProductNewAPI = (ProductNew) => {
  return api("POST", "product/create-product", ProductNew);
};

// Delete Product
const deleteProductAPI = (id) => {
  let url = `product/delete-product?productId=${id}`;
  return api("DELETE", url, null);
};

// Update Product
const updateProductAPI = (productUpdate) => {
  let url = "products/" + productUpdate.id;
  return api("PUT", url, productUpdate);
};
export { getListProductAPI, addProductNewAPI, deleteProductAPI, updateProductAPI };
