// ProductList.jsx
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useProduct } from "../../context/ProductContext/index";
import Sorting from "../../common/sort/sorting";
import formatMoney from "../../utils/formatMoney";
/* eslint-disable*/
function ProductList({ products }) {
  const { addToCart } = useProduct();

  return (
    <>
      {products.map((product) => (
        <div className="box" key={product.id}>
          <div className="product mtop">
            <Link to={`/product/${product.id}`}>
              {" "}
              <div className="img">
                <span className="discount">
                  {product?.discount ? product.discount.discountPercent : 0}%
                  Off
                </span>
                <img
                  src={`${axios.defaults.baseURL + product.productImages[0]}`}
                  alt="..."
                />
                {/* mua ngay */}
                <div className="buy-now">
                  {" "}
                  <Link to="/cart">
                    <button onClick={() => addToCart(product)}>
                      <i className="fa fa-shopping-cart" /> Mua ngay
                    </button>{" "}
                  </Link>
                </div>{" "}
              </div>
            </Link>
            <hr />
            {/* <div className="product-details">
              <Link to={`/product/${product.id}`}>
                <h3>
                  {product.name.length > 50
                    ? `${product.name.slice(0, 50)}...`
                    : product.name}
                </h3>
              </Link>

              <div className="price">
                <h4>
                  {product.discount ? (
                    <div>
                      Giá:
                      <span
                        style={{ textDecoration: "line-through" }}
                      >{`${formatMoney(product.price)}`}</span>
                      <span> </span>
                      <span>{formatMoney(product.discountPrice)}</span>
                    </div>
                  ) : (
                    <span>{formatMoney(product.price)}</span>
                  )}
                </h4>

                <button className="incCart" onClick={() => addToCart(product)}>
                  <i className="fa fa-plus" />
                </button>
              </div>
            </div> */}
            <div className="product-details">
              <Link to={`/product/${product.id}`}>
                <h3>
                  {product.name.length > 50
                    ? `${product.name.slice(0, 50)}...`
                    : product.name}
                </h3>
              </Link>

              <div className="price">
                <h4>
                  {product.discount ? (
                    <div>
                      <p style={{ textDecoration: "line-through" }}>
                        {formatMoney(product.price)}
                      </p>
                      <p>{formatMoney(product.discountPrice)}</p>
                    </div>
                  ) : (
                    <p>{formatMoney(product.price)}</p>
                  )}
                </h4>

                <button className="incCart" onClick={() => addToCart(product)}>
                  <i className="fa fa-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductList;
