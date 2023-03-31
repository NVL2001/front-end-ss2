import React from 'react';
import Home from '../components/MainPage/Home';
import Wrapper from '../components/wrapper/Wrapper';
import TopCate from '../components/top/TopCate';
import NewArrivals from '../components/newarrivals/NewArrivals';
import Discount from '../components/discount/Discount';
import { useProduct } from '../context/ProductContext';
import { PublicLayout } from "../layout/PublicLayout";

function PagesComponent() {
  const { CartItem } = useProduct();
  return (
    <>
      <Home CartItem={CartItem} />
      {/* <FlashDeals productItems={productItems} addToCart={addToCart} /> */}
      <TopCate />
      <NewArrivals />
      <Discount />
      {/* <Shop productItems={productItems} addToCart={addToCart} /> */}
      {/* <Annocument /> */}
      <Wrapper />
    </>
  );
}

function Pages() {
  return (
    <PublicLayout>
      <PagesComponent />
    </PublicLayout>
  );
}

export default Pages;
