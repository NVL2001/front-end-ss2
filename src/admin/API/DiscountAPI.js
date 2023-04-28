import { api } from './api';

// get listDiscount API
const getListDiscountAPI = () => api('GET', 'discount/all', null);

export { getListDiscountAPI };
