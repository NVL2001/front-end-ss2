import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetail.css";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";

import { APIRoutes } from "../../constants/APIRoutes";
import { useProduct } from "../../context/ProductContext";
import { PublicLayout } from "../../layout/PublicLayout";

// spinner
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <FaSpinner className="spinner-icon" />
    </div>
  );
}
function ProductDetailComponent() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { CartItem, decreaseQty, addToCart } = useProduct();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const url = `${APIRoutes.GET_PRODUCT_BY_ID}/${id}`;
      const response = await axios.get(url);
      setProduct(response.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const [sliderData, setSliderData] = useState(
    product ? product.productImages[0] : null
  );
  const handleClick = (index) => {
    setSliderData(product.productImages[index]);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return (
      <>
        <LoadingSpinner />
        <div id="blank"> </div>
      </>
    );
  }

  return (
    <div className="product-detail product-detail-page">
      <div className="leftside">
        <div className="slider">
          <img
            src={`http://${sliderData || product.productImages[0]}`}
            alt="..."
            className="product-image"
          />
        </div>
        <div className="slider-nav">
          {product.productImages.map((image, index) => (
            <img
              src={`http://${image}`}
              alt="..."
              key={image}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>

      <div className="rightside">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">
          {`Giá:
          ${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          VND`}
        </p>
        {/* quantity */}
        <p className="product-quantity">
          {`Tồn kho: 
          ${product.quantity}`}
        </p>

        <div className="quantity-controls">
          <button className="add" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductDetail() {
  return (
    <PublicLayout>
      <ProductDetailComponent />
    </PublicLayout>
  );
}

export default ProductDetail;
