import { api } from './api';

// get listOrder API
const getListOrderAPI = () => api('GET', 'order/get-orders', null);

// Add New Order
const addOrderNewAPI = (OrderNew) => api('POST', 'Order/create-Order', OrderNew);

// Delete Order
const deleteOrderAPI = (id) => {
  const url = `Order/delete-Order?OrderId=${id}`;
  return api('POST', url, null);
};

// Update Order
const updateOrderAPI = (OrderUpdate) => {
  const url = `Orders/${OrderUpdate.id}`;
  return api('PUT', url, OrderUpdate);
};
export {
  getListOrderAPI, addOrderNewAPI, deleteOrderAPI, updateOrderAPI,
};
