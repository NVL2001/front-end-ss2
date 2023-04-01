// CategoryPage.jsx
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import ProductList from "./productsByCategory";
import { useProduct } from "../../context/ProductContext";
import { PublicLayout } from "../../layout/PublicLayout";
import Sorting from "../../common/sort/sorting";

function CategoryPageComponent() {
  const { addToCart } = useProduct();
  const location = useLocation();
  const products = location.state?.products || [];

  const [sortCriteria, setSortCriteria] = useState("name");

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };
  let sortedProducts = [];

  if (Array.isArray(products)) {
    sortedProducts = [...products].sort((a, b) => {
      if (sortCriteria === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortCriteria === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      if (sortCriteria === "price-low-to-high") {
        return a.price - b.price;
      }
      if (sortCriteria === "price-high-to-low") {
        return b.price - a.price;
      }
      if (sortCriteria === "newest") {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
      if (sortCriteria === "oldest") {
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      }
      return 0;
    });
  }
  return (
    <section id="shop" className="shop background">
      <div className="container d_flex">
        <Sorting />
        <div className="contentWidth">
          <div className="product-content  grid1">
            <ProductList addToCart={addToCart} products={products} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryPage() {
  return (
    <PublicLayout>
      <CategoryPageComponent />
    </PublicLayout>
  );
}

export default CategoryPage;
