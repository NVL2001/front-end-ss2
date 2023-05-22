import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import Ndata from "./Ndata";
import formatMoney from "../../utils/formatMoney";
import { Item } from "../../utils/components/Item";

function Cart(props) {
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
        <Item key={val.id}>
          <Link to={`/product/${val.id}`}>
            <div className="img">
              <img src={axios.defaults.baseURL + val.productImages[0]} alt="" />
            </div>
            <h4>
              {val.name.length > 30 ? `${val.name.slice(0, 30)}...` : val.name}
            </h4>
            <span>{formatMoney(val.price)}</span>
          </Link>
        </Item>
      ))}

      {/* <Slider {...settings}>
        {data.map((val) => (
          <Item key={val.id}>
            <Link to={`/product/${val.id}`}>
              <div className="img">
                <img
                  src={axios.defaults.baseURL + val.productImages[0]}
                  alt=""
                />
              </div>
              <h4>
                {val.name.length > 30
                  ? `${val.name.slice(0, 30)}...`
                  : val.name}
              </h4>
              <span>{formatMoney(val.price)}</span>
            </Link>
          </Item>
        ))}
      </Slider> */}
    </div>
  );
}

export default Cart;
