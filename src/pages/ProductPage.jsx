import React from "react";
import Home from "../components/MainPage/Home";
import Shop from "../components/shops/Shop";
import Wrapper from "../components/wrapper/Wrapper";
import Annocument from "../components/annocument/Annocument";

const ProductDetailsPage = ({ productItems, addToCart, CartItem }) => {
  return (
    <>
      {/* <Home CartItem={CartItem} /> */}
      <Shop productItems={productItems} addToCart={addToCart} />
      {/* <Annocument /> */}
      {/* <Wrapper /> */}
    </>
  );
};

export default ProductDetailsPage;
