import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();

  // fixed Header
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    header.classList.toggle("active", window.scrollY > 100);
  });

  // Toogle Menu
  const [MobileMenu, setMobileMenu] = useState(false);
  // fetch '/api/category/get-categories'

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/category/get-categories"
        // "https://b581-125-212-128-186.ap.ngrok.io/api/category/get-categories"
        // "https://bd8e-125-212-128-186.ap.ngrok.io/api/category/get-categories"
      );
      setCategories(response.data);
    };
    fetchData();
  }, []);
  console.log(categories);

  return (
    <>
      <header className="header">
        {/* <div className="container d_flex"> */}
        {/* <div className="categories d_flex">
            <span class="fa-solid fa-border-all"></span>
            <h4>
              Categories <i className="fa fa-chevron-down"></i>
            </h4>
          </div> */}

        <div className="navlink">
          <ul
            className={
              MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
            }
            onClick={() => setMobileMenu(false)}
          >
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Trang chủ
              </Link>
            </li>
            <li className="dropdown">
              <Link
                to="/product"
                className={location.pathname === "/product" ? "active" : ""}
              >
                Sản phẩm
              </Link>

              <div className="dropdown-content">
                {categories.map((category) => (
                  <Link key={category.id} to={`/category/${category.id}`}>
                    {category.name}
                  </Link>
                ))}
              </div>
            </li>
            <li></li>

            <li>
              <Link
                to="/track"
                className={location.pathname === "/track" ? "active" : ""}
              >
                Đơn đặt hàng
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={location.pathname === "/contact" ? "active" : ""}
              >
                Liên hệ
              </Link>
            </li>
          </ul>

          <button className="toggle" onClick={() => setMobileMenu(!MobileMenu)}>
            {MobileMenu ? (
              <i className="fas fa-times close home-btn"></i>
            ) : (
              <i className="fas fa-bars open"></i>
            )}
          </button>
        </div>

        {/* </div> */}
      </header>
    </>
  );
};

export default Navbar;
