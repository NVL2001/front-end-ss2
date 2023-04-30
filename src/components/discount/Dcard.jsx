import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from "axios";
import { Link } from "react-router-dom";
import '../newarrivals/style.css';
import formatMoney from "../../utils/formatMoney";
import { Item } from "../../utils/components/Item";

function Dcard(props) {
  const { data } = props;
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      {data.map((value) => (
        <Item className="box product" key={value.id}>
          <Link to={`/product/${value.id}`}>
            <div className="img">
              <img src={axios.defaults.baseURL + value.productImages[0]} alt="" width="100%" />
            </div>
            <h4>{value.name.length > 15
              ? `${value.name.slice(0, 15)}...`
              : value.name}
            </h4>
            <span>-{value.discount.discountPercent}%</span>
            <span>  </span>
            <p>Còn: {formatMoney(value.discountPrice)}</p>
          </Link>
        </Item>
      ))}
    </Slider>
  );
}

export default Dcard;
