import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Ndata from "./Ndata";
import formatMoney from "../../utils/formatMoney";
import { Item } from "../../utils/components/Item";

function Cart(props, { addToCart }) {
  const { data } = props;
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   slidesToShow: 6,
  //   slidesToScroll: 1,
  //   autoplay: true,
  // };
  return (
    <div className="content grid product">
      {data.map((val) => (
        <Link to={`/product/${val.id}`}>
          <Item key={val.id} className="product--item">
            <div className="img">
              <img src={axios.defaults.baseURL + val.productImages[0]} alt="" />
            </div>
            <div className="infor">
              <h4>
                {val.name.length > 30
                  ? `${val.name.slice(0, 30)}...`
                  : val.name}
              </h4>
              <span>{formatMoney(val.price)}</span>
            </div>
          </Item>
        </Link>
      ))}

      {/* <Slider {...settings}>
        {data.map((val) => (
          <Item key={val.id} className="product--item">
            <Link to={`/product/${val.id}`}>
              <div className="img">
                <img
                  src={axios.defaults.baseURL + val.productImages[0]}
                  alt=""
                />
              </div>
              <div className="infor">
                <h4>
                  {val.name.length > 30
                    ? `${val.name.slice(0, 30)}...`
                    : val.name}
                </h4>
                <span>{formatMoney(val.price)}</span>
              </div>
            </Link>
          </Item>
        ))}
      </Slider> */}
    </div>
  );
}

export default Cart;
