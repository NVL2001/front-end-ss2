import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cart from './Cart';
import './style.css';
import { APIRoutes } from "../../constants/APIRoutes";

function NewArrivals() {
  const [products, setProducts] = useState([]);
  async function fetchArrivals() {
    const response = await axios.get(APIRoutes.GET_NEW_ARRIVALS);
    setProducts(response.data);
  }
  useEffect(() => {
    fetchArrivals();
  }, []);
  return (
    <section className="NewArrivals background">
      <div className="container">
        <div className="heading d_flex">
          <div className="heading-left row  f_flex">
            <img src="https://img.icons8.com/glyph-neue/64/26e07f/new.png" />
            <h2>New Arrivals </h2>
          </div>
          <div className="heading-right row ">
            <span>View all</span>
            <i className="fas fa-arrow-right" />
          </div>
        </div>

        <Cart data={products} />
      </div>
    </section>
  );
}

export default NewArrivals;
