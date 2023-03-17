import axios from "axios";
import React, { useEffect, useState } from "react";
// import { getListProductAPI } from "../../api/ProductAPI";
import { FaSpinner } from 'react-icons/fa';

// const ShopCart = ({ shopItems, addToCart }) => {
const ShopCart = ({ addToCart }) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const LoadingSpinner = () => {
    return (
      <div className="loading-spinner">
        <FaSpinner className="spinner-icon" />
      </div>
    );
  };
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/product/products"
      );
      setProducts(response.data);
      setLoading(false);
    };

    fetchData();
  }, []);
  console.log("products");

  console.log(products.pageItems);

  return (
    <>
      {loading ? (
        <LoadingSpinner />


      ) : (
        <>
          {products.pageItems.map((pageItem, index) => {
            return (
              <div className="box" key={index}>
                <div className="product mtop">
                  <div className="img">
                    <span className="discount">{pageItem.discount}% Off</span>
                    <img
                      src={`http://${pageItem.productImages[0]}`}
                      alt="image"
                    />

                    <div className="product-like">
                      <label>{count}</label> <br />
                      <i
                        className="fa-regular fa-heart"
                        onClick={increment}
                      ></i>
                    </div>
                  </div>
                  <div className="product-details">
                    <h3>{pageItem.name}</h3>
                    <div className="rate">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <div className="price">
                      <h4>{pageItem.price} VND </h4>
                      {/* step : 3
              if hami le button ma click garryo bahne
             */}
                      <button onClick={() => addToCart(pageItem)}>
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );

  // return (
  //   <>
  //     {shopItems.map((shopItems, index) => {
  //       return (
  //         <div className="box">
  //           <div className="product mtop">
  //             <div className="img">
  //               <span className="discount">{shopItems.discount}% Off</span>
  //               <img src={shopItems.cover} alt="" />
  //               <div className="product-like">
  //                 <label>{count}</label> <br />
  //                 <i className="fa-regular fa-heart" onClick={increment}></i>
  //               </div>
  //             </div>
  //             <div className="product-details">
  //               <h3>{shopItems.name}</h3>
  //               {/* <div className="rate">
  //                 <i className="fa fa-star"></i>
  //                 <i className="fa fa-star"></i>
  //                 <i className="fa fa-star"></i>
  //                 <i className="fa fa-star"></i>
  //                 <i className="fa fa-star"></i>
  //               </div> */}
  //               <div className="price">
  //                 <h4>${shopItems.price}.00 </h4>
  //                 {/* step : 3
  //                    if hami le button ma click garryo bahne
  //                   */}
  //                 <button onClick={() => addToCart(shopItems)}>
  //                   <i className="fa fa-plus"></i>
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     })}
  //   </>
  // );
};

export default ShopCart;
