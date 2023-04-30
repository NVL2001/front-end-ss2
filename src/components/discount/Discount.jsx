import React, { useEffect, useState } from 'react';
import axios from "axios";
import Dcard from './Dcard';
import { APIRoutes } from "../../constants/APIRoutes";

function Discount() {
  const [discountPro, setDiscountPro] = useState([]);
  async function fetchBigDiscounts() {
    const response = await axios.get(APIRoutes.GET_DISCOUNT_PRODUCT);
    setDiscountPro(response.data);
  }
  useEffect(() => {
    fetchBigDiscounts();
  }, []);
  return (
    <section className="Discount background NewArrivals">
      <div className="container">
        <div className="heading d_flex">
          <div className="heading-left row  f_flex">
            <img src="https://img.icons8.com/windows/32/fa314a/gift.png" />
            <h2>Big Discounts</h2>
          </div>
          <div className="heading-right row ">
            <span>View all</span>
            <i className="fas fa-arrow-right" />
            {' '}

          </div>
        </div>
        <Dcard data={discountPro} />
      </div>
    </section>
  );
}

export default Discount;
