import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useHistory } from "react-router-dom";

import { getCategories } from "../../api/categories";
import { getProductsByCategory } from "../../api/products";

function Navbar() {
  const location = useLocation();
  // fixed Header
  // window.addEventListener('scroll', () => {
  //   const header = document.querySelector('.header');
  //   header.classList.toggle('active', window.scrollY > 100);
  // });

  // Toogle Menu
  const [MobileMenu, setMobileMenu] = useState(false);

  // fetch '/api/category/get-categories'
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategories();
      setCategories(response.data);
    };
    fetchData();
  }, []);
  // console.log(categories);

  // product by cate
  const history = useHistory();

  const handleCategoryClick = async (category) => {
    try {
      const response = await getProductsByCategory(category.name);
      history.push({
        pathname: `/category/${category.name}`,
        state: { products: response.data },
      });
    } catch (err) {
      toast.error("Something went wrong, try again later");
    }
  };

  return (
    <header className="header">
      <div className="navlink">
        <ul
          className={
            MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
          }
          onClick={() => setMobileMenu(false)}
        >
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
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
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </li>
          <li />

          <li>
            <Link
              to="/order"
              className={location.pathname === "/track" ? "active" : ""}
            >
              Đơn đặt hàng
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={location.pathname === "/about" ? "active" : ""}
            >
              Giới thiệu
            </Link>
          </li>
        </ul>

        <button className="toggle" onClick={() => setMobileMenu(!MobileMenu)}>
          {MobileMenu ? (
            <i className="fas fa-times close home-btn" />
          ) : (
            <i className="fas fa-bars open" />
          )}
        </button>
      </div>

      {/* </div> */}
    </header>
  );
}

export default Navbar;
