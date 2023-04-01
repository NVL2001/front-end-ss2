import React, { useState, useEffect } from "react";
// import logo from "../../components/assets/images/logoweb.webp";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import logo from "../../components/assets/images/logo.png";
import { LoginModal } from "../../components/LoginModal";
import { RegisterModal } from "../../components/RegisterModal";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";

function Search() {
  const { CartItem } = useProduct();

  const { user } = useAuth();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const search = document.querySelector(".search");
      search.classList.toggle("active", window.scrollY > 100);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        const search = document.querySelector(".search");
        search.classList.toggle("active", window.scrollY > 100);
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
          {/* {user ? ( */}
          {/*  <Link to="/user"> */}
          {/*    <div className="user"> */}
          {/*      <i className="fa fa-user icon-circle" /> */}
          {/*    </div> */}
          {/*  </Link> */}
          {/* ) : ( */}
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
          {/* )} */}
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
