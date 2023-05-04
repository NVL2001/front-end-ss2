<<<<<<< Updated upstream
=======
/* eslint-disable no-undef */
>>>>>>> Stashed changes
import axios from 'axios';
import { api } from './api';

const getListCategoryAPI = () => api('GET', 'category/get-categories', null);

<<<<<<< Updated upstream
const createCategoryAPI = async (name) => {
  try {
    const response = await axios.post(`category/create-category`, { name });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export { getListCategoryAPI, createCategoryAPI };
=======
const deleteCategoryAPI = (name) => {
  const url = `category/delete-category?categoryName=${encodeURIComponent(name)}`;
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
  };
  return api('DELETE', url, null, headers);
};

export { getListCategoryAPI, deleteCategoryAPI };
>>>>>>> Stashed changes
