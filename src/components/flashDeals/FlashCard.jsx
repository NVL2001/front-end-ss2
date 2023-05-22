import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right" />
      </button>
    </div>
  );
}
function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-long-arrow-alt-left" />
      </button>
    </div>
  );
}
function FlashCard({ productItems, addToCart }) {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Slider {...settings}>
      {productItems.map((productItems) => (
        <div className="box">
          <div className="product mtop">
            <div className="img">
              <span className="discount">{productItems.discount}% Off</span>
              <img src={productItems.cover} alt="" />
              <div className="product-like">
                <p>{count}</p> <br />
                <i className="fa-regular fa-heart" onClick={increment} />
              </div>
            </div>
            <div className="product-details">
              <h3>{productItems.name}</h3>
              <div className="rate">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <div className="price">
                <h4>
                  ${productItems.price}
                  .00{" "}
                </h4>
                {/* step : 3
                     if hami le button ma click garryo bahne
                    */}
                <button onClick={() => addToCart(productItems)}>
                  <i className="fa fa-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default FlashCard;
