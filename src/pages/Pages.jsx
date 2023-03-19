import React from "react";
import Home from "../components/MainPage/Home";
import Shop from "../components/shops/Shop";
import Wrapper from "../components/wrapper/Wrapper";
import FlashDeals from "../components/flashDeals/FlashDeals";
import TopCate from "../components/top/TopCate";
import NewArrivals from "../components/newarrivals/NewArrivals";
import Annocument from "../components/annocument/Annocument";
import Discount from "../components/discount/Discount";

const Pages = ({ productItems, addToCart, CartItem }) => {
  return (
    <>
      <Home CartItem={CartItem} />
      <FlashDeals productItems={productItems} addToCart={addToCart} />
      <TopCate />
      <NewArrivals />
      <Discount />
      {/* <Shop productItems={productItems} addToCart={addToCart} /> */}
      {/* <Annocument /> */}
      <Wrapper />
    </>
  );
};

export default Pages;
