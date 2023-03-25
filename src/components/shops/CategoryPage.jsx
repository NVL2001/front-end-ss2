// CategoryPage.jsx
import { useLocation } from "react-router-dom";
import ProductList from "./productsByCategory";
import React, { useState } from "react";

function CategoryPage({ addToCart }) {
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
    <>
      <section id="shop" className="shop background">
        <div className="container d_flex">
          {/* <Catg /> */}

          <div className="contentWidth">
            <div className="heading d_flex">
              <div className="heading-left row  f_flex">
                {/* <h1>
                Danh mục<i className="fa-solid fa-down"></i>
              </h1> */}
              </div>
              <div className="heading-right row ">
                <div className="collection-sorting-wrapper">
                  <div className="form-horizontal not-filter">
                    <select
                      name="SortBy"
                      id="SortBy"
                      value={sortCriteria}
                      onChange={handleSortChange}
                    >
                      <option value="name-asc">Tên: A-Z</option>
                      <option value="name-desc">Tên: Z-A</option>
                      <option value="price-low-to-high">Giá: Tăng dần</option>
                      <option value="price-high-to-low">Giá: Giảm dần</option>
                      <option value="newest">Mới nhất</option>
                      <option value="oldest">Cũ nhất</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="product-content  grid1">
              {/* <ShopCard addToCart={addToCart} shopItems={shopItems} /> */}
              <ProductList addToCart={addToCart} products={products} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CategoryPage;
