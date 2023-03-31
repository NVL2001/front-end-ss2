import React from "react";
import Slider from "react-slick";
import Sdata from "./Sdata";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
            <button className="btn-primary">Mua ngay</button>
          </div>
          {/* <div className="right">
            <img src={value.cover} alt="" />
          </div> */}
        </div>
      ))}
    </Slider>
  );
}

export default SlideCard;
