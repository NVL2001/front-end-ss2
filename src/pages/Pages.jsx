import React from "react";
import Home from "../components/MainPage/Home";
import Shop from "../components/shops/Shop";
import Wrapper from "../components/wrapper/Wrapper";

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  return (
    <>
      <Home CartItem={CartItem} />
      {/* <FlashDeals productItems={productItems} addToCart={addToCart} /> */}
      {/* <TopCate /> */}
      {/* <NewArrivals /> */}
      {/* <Discount /> */}
      <Shop shopItems={shopItems} addToCart={addToCart} />
      {/* <Annocument /> */}
      <Wrapper />
    </>
  );
};

export default Pages;
