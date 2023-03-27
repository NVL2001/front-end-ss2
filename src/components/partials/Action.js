export const logout = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('cart');
  window.location.href = '/';
};
