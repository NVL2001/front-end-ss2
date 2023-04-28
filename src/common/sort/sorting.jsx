import React, { useState, useEffect } from "react";
// import './sorting.css';
import { Link, useLocation, useHistory } from "react-router-dom";
/* eslint-disable */
function Sorting() {
  const location = useLocation();

  return (
    <div className="topshop">
      <div className="sortbar">
        <div className=" pagination-dropdown">
          <select id="pagination-select">
            <option value="15">15 mỗi trang</option>
            <option value="30">30 mỗi trang</option>
            <option value="60">60 mỗi trang</option>
            <option value="100">100 mỗi trang</option>
          </select>
        </div>

        <div className="form-horizontal not-filter">
          <select name="SortBy" id="SortBy">
            <option value="name-asc">Sắp xếp theo tên: A → Z</option>
            <option value="name-desc">Sắp xếp theo tên: Z ← A</option>
            <option value="price-low-to-high">
              Sắp xếp theo giá: Tăng dần
            </option>
            <option value="price-high-to-low">
              Sắp xếp theo giá: Giảm dần
            </option>
            <option value="newest">Sắp xếp theo mới nhất</option>
            <option value="oldest">Sắp xếp theo cũ nhất</option>
          </select>
        </div>
        {/*  */}
      </div>
    </div>
  );
}

export default Sorting;
