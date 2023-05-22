/* eslint-disable no-undef */
import axios from 'axios';
// import queryString from "query-string";
import { api } from './api';

const getListCategoryAPI = () => api('GET', 'category/get-categories', null);

// const createCategoryAPI = async (name) => {
//   try {
//     const response = await axios.post(`category/create-category`, { name });
//     return response.data;
//   } catch (error) {
//     console.error('Error creating category:', error);
//     throw error;
//   }
// };
// export { getListCategoryAPI, createCategoryAPI };
// const deleteCategoryAPI = (name) => {
//   const url = `category/delete-category?categoryName=${encodeURIComponent(name)}`;
//   const headers = {
//     'X-Requested-With': 'XMLHttpRequest',
//     'Access-Control-Allow-Origin': '*',
//   };
//   return api('DELETE', url, null, headers);
// };
const deleteCategoryAPI = (name) => {
  // const url = `category/delete-category?categoryName=${encodeURIComponent(name)}`;
  const url = `category/delete-category?categoryName=${name}`;
  return api('POST', url, null, null);
};

// const updateCategoryAPI = async (id, newName) => {
//   const response = await fetch(`http://localhost:8080/api/category/update-category?id=${id}&newName=${newName}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*',
//     },
//   });
//   if (!response.ok) {
//     throw new Error('Failed to update category');
//   }

//   return response.json();
// };

const updateCategoryAPI = (id, newName) => {
  const url = `category/update-category?id=${id}&newName=${newName}`;
  return api('POST', url, null, null);
};

export { getListCategoryAPI, deleteCategoryAPI, updateCategoryAPI };
