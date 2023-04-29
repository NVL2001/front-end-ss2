import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetail.css";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";

import {
  Box, Card, CardContent, Typography
} from "@mui/material";
import { APIRoutes } from "../../constants/APIRoutes";
import { useProduct } from "../../context/ProductContext";
import { PublicLayout } from "../../layout/PublicLayout";
import formatMoney from "../../utils/formatMoney";
import formatDate from "../../utils/formatDate";

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

  const card = (product.discount)
    ? (
      <CardContent>
        <Typography sx={{ fontSize: 14 }} variant="h5" color="text.secondary" gutterBottom>
          Giảm giá
        </Typography>
        <Typography variant="body1">
          {`Mã: ${product.discount.code}`}
        </Typography>
        <Typography variant="body2">
          {`Hết hạn: ${formatDate(product.discount.endDate)}`}
        </Typography>
      </CardContent>
    ) : null;

  return (
    <div className="product-detail product-detail-page">
      <div className="leftside">
        <div className="slider">
          <img
            src={`${axios.defaults.baseURL + (sliderData || product.productImages[0])}`}
            alt="..."
            className="product-image"
          />
        </div>
        <div className="slider-nav">
          {product.productImages.map((image, index) => (
            <img
              src={`${axios.defaults.baseURL + image}`}
              alt="..."
              key={image}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        <div>
          {
            card
              ? (
                <Box sx={{ minWidth: 200 }}>
                  <Card variant="outlined">{card}</Card>
                </Box>
              ) : null
          }
        </div>

      </div>

      <div className="rightside">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">
          {(product.discount
            ? (
              <div>
                Giá:
                <span style={{ textDecoration: "line-through" }}>{`${formatMoney(product.price)}`}</span>
                <span>  </span>
                <span>{formatMoney(product.discountPrice)}</span>
              </div>
            )
            : (<span>{formatMoney(product.price)}</span>)
          )}
        </p>
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
