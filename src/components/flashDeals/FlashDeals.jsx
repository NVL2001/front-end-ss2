import React from "react";
import FlashCard from "./FlashCard";
import "./style.css";

function FlashDeals({ addToCart }) {
  return (
    <section className="flash">
      <div className="container">
        <div className="heading f_flex">
          <i className="fa fa-bolt" />
          <h1>Flash sale</h1>
        </div>
        <FlashCard addToCart={addToCart} />
      </div>
    </section>
  );
}

export default FlashDeals;
