import { api } from './api';

// get listOrder API
const getListOrderAPI = () => api('POST', 'order/admin-orders', null);

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
  return api('POST', url, OrderUpdate);
};

// Change order status
const setOrderDeliveringAPI = (id) => {
  const url = `order/delivering`;
  return api('POST', url, id);
};
const cancelOrderByAdminAPI = (id) => {
  const url = `order/admin-cancel`;
  return api('POST', url, id);
};
const setOrderCompleteAPI = (id) => {
  const url = `order/complete`;
  return api('POST', url, id);
};
export {
  // eslint-disable-next-line max-len
  getListOrderAPI, addOrderNewAPI, deleteOrderAPI, updateOrderAPI, setOrderDeliveringAPI, cancelOrderByAdminAPI, setOrderCompleteAPI
};
