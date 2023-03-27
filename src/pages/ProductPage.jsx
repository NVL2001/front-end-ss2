import React from 'react';
import Shop from '../components/shops/Shop';
import { useProduct } from '../context/ProductContext';

function ProductPage() {
  const { addToCart } = useProduct();
  return (
    <>
      {/* <Home CartItem={CartItem} /> */}
      <Shop addToCart={addToCart} />
    </>
  );
}

export default ProductPage;
