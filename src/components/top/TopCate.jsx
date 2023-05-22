import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import TopCart from "./TopCart";
import { APIRoutes } from "../../constants/APIRoutes";

function TopCate() {
  const [categories, setCategories] = useState([]);
  async function fetchTopCategory() {
    const response = await axios.get(APIRoutes.GET_CATEGORIES);
    setCategories(response.data);
  }
  useEffect(() => {
    fetchTopCategory();
  }, []);
  return (
    <section className="TopCate background">
      <div className="container">
        <div className="heading d_flex">
          <div className="heading-left row  f_flex">
            <i className="fas fa-border-all" />
            <h2>Top Danh mục</h2>
          </div>
          <div className="heading-right row ">
            <span>Xem thêm</span>
            <i className="fas fa-arrow-right" />
          </div>
        </div>
        <TopCart data={categories} />
      </div>
    </section>
  );
}

export default TopCate;
