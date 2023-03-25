import React from "react";
// import logo from "../../components/assets/images/logoweb.webp";
import logo from "../../components/assets/images/logo.png";

import { Link } from "react-router-dom";
import { useState } from "react";
const Search = ({ CartItem }) => {
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <a href="/">
              {""}
              <img src={logo} alt="" />
            </a>
          </div>

          <div className="search-box f_flex" aria-label="search">
            <a href="" target="_blank" hidden></a>

            <i className="fa fa-search"></i>
            <input id="search" type="text" placeholder="Nhập từ tìm kiếm..." />
            {/* <span>All Category</span> */}
            <div className="autocom-box"></div>
          </div>

          <div className="icon f_flex width">
            <div className="user">
              <i className="fa fa-user icon-circle"></i>
            </div>

            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
