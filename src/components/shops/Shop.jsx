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
                {/* category */}
                <h1>
                  Category<i className="fa-solid fa-caret-down"></i>
                </h1>
              </div>
              <div className="heading-right row ">
                <span>View all</span>
                <i className="fa-solid fa-caret-right"></i>
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
