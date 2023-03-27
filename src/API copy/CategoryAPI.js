import { api } from './api';

const getListCategoryAPI = () => api('GET', 'category/get-categories', null);

// export
export { getListCategoryAPI };
