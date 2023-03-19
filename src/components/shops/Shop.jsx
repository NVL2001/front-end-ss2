import React from "react";
// import Catg from "./Catg";
import ShopCart from "./ShopCart";
import "./style.css";
// import { useHistory, useParams } from "react-router-dom";
// import { getAllProduct } from "../../api/apiAllProduct";

// const Shop = ({ addToCart, shopItems }) => {
const Shop = ({ addToCart }) => {
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
                <div class="collection-sorting-wrapper">
                  <div class="form-horizontal not-filter">
                    <select name="SortBy" id="SortBy">
                      <option value="manual">Sản phẩm nổi bật</option>
                      <option value="best-selling">Bán chạy nhất</option>
                      <option value="title-ascending">Tên: A-Z</option>
                      <option value="title-descending">Tên: Z-A</option>
                      <option value="price-ascending">Giá: Tăng dần</option>
                      <option value="price-descending">Giá: Giảm dần</option>
                      <option value="created-descending">Mới nhất</option>
                      <option value="created-ascending">Cũ nhất</option>
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
