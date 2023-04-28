/* eslint-disable*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import logo from "../../components/assets/images/logo.png";
import { LoginModal } from "../../components/LoginModal";
import { RegisterModal } from "../../components/RegisterModal";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";

function Search() {
  const { CartItem } = useProduct();

  const { user, setUser } = useAuth();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const search = document.querySelector(".search");
      search.classList.toggle("active", window.scrollY > 50);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        const search = document.querySelector(".search");
        search.classList.toggle("active", window.scrollY > 50);
      });
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

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

  const handleToggle = () => {
    setIsOpen(!isOpen);
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
  };

  return (
    <section className="search">
      <div className="container c_flex">
        <div className="logo width ">
          <a href="/">
            <img src={logo} alt="" />
          </a>
        </div>

        <div className="search-box f_flex" aria-label="search">
          {/* <a href="*" target="_blank" hidden /> */}

          <i className="fa fa-search" />
          <input id="search" type="text" placeholder="Nhập từ tìm kiếm..." />
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
