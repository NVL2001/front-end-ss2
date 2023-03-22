import React, { useState } from "react";

// import Catg from "./Catg";
import ShopCart from "./ShopCart";
import "./style.css";
// import { useHistory, useParams } from "react-router-dom";
// import { getAllProduct } from "../../api/apiAllProduct";

// const Shop = ({ addToCart, shopItems }) => {
const Shop = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const handleSortByPriceHighToLow = () => {
    // Sort products by price in descending order
    setProducts([...products].sort((a, b) => b.price - a.price));
    setSortOption("price-high-to-low");
  };
  const handleSortByPriceLowToHigh = () => {
    // Sort products by price in ascending order
    setProducts([...products].sort((a, b) => a.price - b.price));
    setSortOption("price-low-to-high");
  };
  const handleSortByNameAsc = () => {
    // Sort products by name in ascending order
    setProducts([...products].sort((a, b) => a.name.localeCompare(b.name)));
    setSortOption("name-asc");
  };
  const handleSortByNameDesc = () => {
    // Sort products by name in descending order
    setProducts([...products].sort((a, b) => b.name.localeCompare(a.name)));
    setSortOption("name-desc");
  };
  const handleSortByNewest = () => {
    // Sort products by date added in descending order
    setProducts(
      [...products].sort(
        (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
      )
    );
    setSortOption("newest");
  };
  const handleSortByOldest = () => {
    // Sort products by date added in ascending order
    setProducts(
      [...products].sort(
        (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)
      )
    );
    setSortOption("oldest");
  };
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
                      value={sortOption}
                      onChange={(event) => setSortOption(event.target.value)}
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
              {/* <ShopCart addToCart={addToCart} shopItems={shopItems} /> */}
              <ShopCart addToCart={addToCart} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;

// import { useEffect, useState } from "react";

// const Shop = () => {
//   const { products } = data;
//   const history = useHistory();

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   const [isFetching, setIsFetching] = useState(true);

//   const fetchData = () => {
//     getAllProduct()
//       .then((res) => {
//         console.log(res);
//         setData(res.data);
//         setIsFetching(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return <></>;
// };

// export default Shop;
