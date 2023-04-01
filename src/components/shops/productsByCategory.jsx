// ProductList.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../../context/ProductContext/index";
import Sorting from "../../common/sort/sorting";
/* eslint-disable*/
function ProductList({ products }) {
  const { addToCart } = useProduct();

  return (
    <>
      {/* <Sorting /> */}
      {products.map((product) => (
        <div className="box" key={product.id}>
          <div className="product mtop">
            <Link to={`/product/${product.id}`}>
              {" "}
              <div className="img">
                <span className="discount">{product.discount}% Off</span>

                <img src={`http://${product.productImages[0]}`} alt="..." />

                <div className="product-like">
                  <i className="fas fa-heart" />
                </div>
              </div>
            </Link>
            <hr />
            <div className="product-details">
              <Link to={`/product/${product.id}`}>
                <h3>
                  {product.name.length > 65
                    ? `${product.name.slice(0, 65)}...`
                    : product.name}
                </h3>
              </Link>

              <div className="price">
                <h4>
                  {product.price

                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  VND
                </h4>

                <button onClick={() => addToCart(product)}>
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
