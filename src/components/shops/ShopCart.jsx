import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import defaultImage from "../assets/images/logoweb.webp";

// const ShopCart = ({ shopItems, addToCart }) => {
const ShopCart = ({ addToCart, src }) => {
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
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
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
                // onClick={() => setSelectedProductId}
              >
                <div className="product mtop">
                  <Link to={`/products/${pageItem.id}`}>
                    {" "}
                    <div className="img">
                      <span className="discount">{pageItem.discount}% Off</span>

                      <img
                        src={`http://${pageItem.productImages[0]}`}
                        alt="..."
                      />

                      <div className="product-like">
                        <label>{count}</label> <br />
                        <i className="fas fa-heart" onClick={increment}></i>
                      </div>
                    </div>
                  </Link>
                  <hr />
                  <div className="product-details">
                    <Link to={`/products/${pageItem.id}`}>
                      <h3>
                        {pageItem.name.length > 65
                          ? `${pageItem.name.slice(0, 65)}...`
                          : pageItem.name}
                      </h3>
                    </Link>

                    <div className="price">
                      <h4>{pageItem.price} VND </h4>

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
