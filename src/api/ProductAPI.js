import { api } from "./api";


// get listProduct API
const getListProductAPI = () => {
  return api("GET", "product/products", null);
};
//product by category
const getProductByCategory = async (categoryName) => {
  return api("GET", `product/get-product-by-category/${categoryName}`, null);
}

//single product
const getProduct = async (id) => {
  return api("GET", `product/get-product/${id}`, null);
}

// export 
export { getListProductAPI, getProductByCategory, getProduct };