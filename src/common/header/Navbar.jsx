import React, { useState, useEffect } from "react";
import { Menu, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import { Link, useLocation, useHistory } from "react-router-dom";
import { getCategories } from "../../api/categories";
import { getProductsByCategory } from "../../api/products";
/*eslint-disable*/

function Navbar() {
  const location = useLocation();
  //
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // Toogle Menu
  const [showLinks, setShowLinks] = useState(false);

  const handleToggle = () => {
    setShowLinks(!showLinks);
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategories();
      setCategories(response.data);
    };
    fetchData();
  }, []);

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
        {/*  */}
        <div className="dropdown1">
          <button onClick={toggleDropdown} className="dropbtn">
            Danh mục sản phẩm
            <i className="fas fa-caret-down" />
          </button>

          {isOpen && (
            <div className="dropdown-content1">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.name}`}
                  onClick={() => {
                    handleCategoryClick(category);
                    toggleDropdown();
                  }}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        {/*  */}
        <button className="navbar-toggle" onClick={handleToggle}>
          {showLinks ? (
            <i className="fas fa-times close home-btn" />
          ) : (
            <i className="fas fa-bars open" />
          )}
        </button>
        <ul className={`navbar-links ${showLinks ? "show" : ""}`}>
          {/* className={
          MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
        }
        onClick={() => setMobileMenu(true)}
        onClick={() => setMobileMenu(!MobileMenu)} */}
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
                  to={`/category/${category.name}`}
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
              className={location.pathname === "/order" ? "active" : ""}
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

        {/* <button
          className="navbar-toggler"
          onClick={() => setMobileMenu(!MobileMenu)}
        >
          {MobileMenu ? (
            <i className="fas fa-times close home-btn" />
          ) : (
            <i className="fas fa-bars open" />
          )}
        </button> */}
      </div>

      {/* </div> */}
    </header>
  );
}

export default Navbar;
