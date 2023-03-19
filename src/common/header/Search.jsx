import React from "react";
import logo from "../../components/assets/images/logoweb.webp";
import { Link } from "react-router-dom";

const Search = ({ CartItem }) => {
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });

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

          <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Nhập từ tìm kiếm..." />
            {/* <span>All Category</span> */}
          </div>

          <div className="icon f_flex width">
            <Link to="/user">
              <i className="fa fa-user icon-circle"> </i>
            </Link>

            {/* <LoginSignup /> */}
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
