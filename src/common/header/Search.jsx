/* eslint-disable*/
import React, { useState, useEffect } from "react";
import {Link, useHistory} from "react-router-dom";
import {Button, debounce, Menu, MenuItem, Stack, Typography} from "@mui/material";
import logo from "../../components/assets/images/logo.png";
import { LoginModal } from "../../components/LoginModal";
import { RegisterModal } from "../../components/RegisterModal";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";
import axios from "axios";
import SearchInput from "./SearchInput";
import {APIRoutes} from "../../constants/APIRoutes";

function Search() {
  const { CartItem, clearItem, setCartItem } = useProduct();

  const { user, setUser } = useAuth();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const [products, setProducts] = useState([])

  const handelSearchProduct = debounce(async (value) => {
    if (value === "")
      return

    const res = await axios.get(APIRoutes.SEARCH_PRODUCT_BY_NAME, {
      params: {
        q: value
      }
    })
    setProducts(res.data)
  }, 500)

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleOpenRegisterModal = () => {
    setOpenRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setOpenRegisterModal(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {

    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    clearItem();
    setCartItem([]);
    delete axios.defaults.headers['Authorization'];
    history.push("/")
  };

  return (
    <section className="search">
      <div className="container c_flex">
        <div className="logo width ">
          <a href="/">
            <img src={logo} alt="" />
          </a>
        </div>

        <div className="search-box" aria-label="search">
          {/* <a href="*" target="_blank" hidden /> */}

          {/*<i className="fa fa-search" />*/}
          {/*<input id="search" type="text" placeholder="Nhập từ tìm kiếm..." />*/}
          <SearchInput products={products} onSearchProduct={handelSearchProduct} />
          {/* <span>All Category</span> */}
          <div className="autocom-box" />
        </div>

        <Stack
          direction="row"
          alignItems="center"
          className="icon f_flex width"
          columnGap={1}
        >
          {user ? (
            <div>
              <div className="user" onClick={handleClick}>
                <i className="fa fa-user icon-circle" />
              </div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link to="/user">
                  <MenuItem>Tài khoản của tôi</MenuItem>
                </Link>
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Button onClick={handleOpenLoginModal}>
                <Typography sx={{ color: "#ffffff", textTransform: "none" }}>
                  Login
                </Typography>
              </Button>
              <Button onClick={handleOpenRegisterModal}>
                <Typography sx={{ color: "#ffffff", textTransform: "none" }}>
                  Sign Up
                </Typography>
              </Button>
            </>
          )}
          <Link to="/cart">
            <div className="cart">
              <i className="fa fa-shopping-bag icon-circle" />
              <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
            </div>
          </Link>
        </Stack>
      </div>
      <LoginModal open={openLoginModal} onClose={handleCloseLoginModal} />
      <RegisterModal
        open={openRegisterModal}
        onClose={handleCloseRegisterModal}
      />
    </section>
  );
}

export default Search;
