import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

export const cartListProduct = async () => {
  const carts = JSON.parse(localStorage.getItem('cart'));
  const productArray = [];
  if (carts) {
    for (const cart of carts) {
      productArray.push(cart.id);
    }
  }
  try {
    const res = await axios.post(`${apiURL}/api/product/cart-product`, {
      productArray,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
