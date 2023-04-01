import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sdata from "./Sdata";

const renderDots = (dots) => <ul style={{ margin: "0px" }}>{dots}</ul>;

function SlideCard() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => renderDots(dots),
  };
  return (
    <Slider {...settings}>
      {Sdata.map((value) => (
        <div className="box d_flex top" key={value.title}>
          <div className="slide--left">
            <h1>{value.title}</h1>
            <p>{value.desc}</p>
            <Link to="/product">
              <button className="btn-primary">Mua ngay</button>
            </Link>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default SlideCard;
