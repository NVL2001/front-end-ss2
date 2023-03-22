import React from "react";
import Shop from "../components/shops/Shop";

const ProductPage = ({ addToCart, CartItem }) => {
  return (
    <>
      {/* <Home CartItem={CartItem} /> */}
      <Shop addToCart={addToCart} />
    </>
  );
};

export default ProductPage;
