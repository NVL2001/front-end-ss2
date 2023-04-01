import React from "react";
import Shop from "../components/shops/Shop";
import { useProduct } from "../context/ProductContext";
import { PublicLayout } from "../layout/PublicLayout";

function ProductPage() {
  const { CartItem, addToCart } = useProduct();
  return (
    <PublicLayout>
      {/* <Home CartItem={CartItem} /> */}
      <Shop CartItem={CartItem} addToCart={addToCart} />
    </PublicLayout>
  );
}

export default ProductPage;
