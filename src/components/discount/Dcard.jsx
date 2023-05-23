import React from "react";
import Slider from "react-slick";
import "./discount.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "../newarrivals/style.css";
import formatMoney from "../../utils/formatMoney";
import { Item } from "../../utils/components/Item";

function Dcard(props) {
  const { data } = props;
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
  };
  return (
    <div className="discountContainer">
      {data.map((value) => (
        <Item className="box-product" key={value.id}>
          <Link to={`/product/${value.id}`}>
            <div className="img">
              <img
                src={axios.defaults.baseURL + value.productImages[0]}
                alt=""
                width="100%"
              />
            </div>
            <div className="infor">
              <h4>
                {value.name.length > 15
                  ? `${value.name.slice(0, 15)}...`
                  : value.name}
              </h4>
              <span>-{value.discount.discountPercent}%</span>
              <span> </span>
              <p>Còn: {formatMoney(value.discountPrice)}</p>
            </div>
          </Link>
        </Item>
      ))}
    </div>
  );
}

export default Dcard;
