import React from 'react';
import Shop from '../components/shops/Shop';
import { useProduct } from '../context/ProductContext';
import { PublicLayout } from "../layout/PublicLayout";

function ProductPageComponent() {
  const { addToCart } = useProduct();

  return (
    <Shop addToCart={addToCart} />
  );
}

function ProductPage() {
  return (
    <PublicLayout>
      <ProductPageComponent />
    </PublicLayout>
  );
}

export default ProductPage;
