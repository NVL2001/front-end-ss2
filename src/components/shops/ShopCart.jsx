import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";

// const ShopCart = ({ shopItems, addToCart }) => {
const ShopCart = ({ addToCart }) => {
  //LIKE
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  //spinner
  const LoadingSpinner = () => {
    return (
      <div className="loading-spinner">
        <FaSpinner className="spinner-icon" />
      </div>
    );
  };
  const history = useHistory();
  const { setProductDetail } = useProduct();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  //fetch
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
 
  const handleRedirectToProductDetail = (pageItem) => {
    setProductDetail(pageItem);
    history.push(`/details/${pageItem.id}`);
  };
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {products.pageItems.map((pageItem, index) => {
            return (
              <div
                className="box"
                key={pageItem.id}
                onClick={() => setSelectedProductId}
              >
                <div className="product mtop">
                  <Link to={`/products/${pageItem.id}`}>
                    {" "}
                    <div className="img">
                      <span className="discount">{pageItem.discount}% Off</span>
                      <img
                        src={`http://${pageItem.productImages[0]}`}
                        alt="image"
                      />

                      <div className="product-like">
                        <label>{count}</label> <br />
                        <i
                          className="fas fa-heart"
                          onClick={increment}
                        ></i>
                      </div>
                    </div>
                  </Link>
                  <div className="product-details">
                    <h3>
                    {pageItem.name.length > 60 
                      ? `${pageItem.name.slice(0, 60)}...` : pageItem.name}
                    </h3>


                    {/* <div className="rate">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div> */}
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
};

export default ShopCart;
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
