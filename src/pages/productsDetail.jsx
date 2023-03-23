import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetail.css";
const ProductDetail = (props) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const id = props.match.params.id;
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/product/get-product/${id}`
      );
      setProduct(response.data);
    };
    fetchData();
  }, [props.match.params.id]);

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
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="product-detail">
        <div className="leftside">
          <div className="slider">
            <img
              src={`http://${
                sliderData ? sliderData : product.productImages[0]
              }`}
              alt="..."
              className="product-image"
            />
          </div>
          <div className="slider-nav">
            {product.productImages.map((image, index) => {
              return (
                <img
                  src={`http://${image}`}
                  alt="..."
                  key={index}
                  onClick={() => handleClick(index)}
                />
              );
            })}
          </div>
        </div>

        <div className="rightside">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: {product.price} vnd</p>
          <div className="quantity-controls">
            <button onClick={handleDecrement}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrement}>+</button>
            <button className="add">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
