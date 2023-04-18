import React from "react";
import "./style.css";
import logo from "../../components/assets/images/logo.png";

function Footer() {
  return (
    <footer>
      <div className="container grid2">
        <div className="box">
          <div className="logo width ">
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </div>
          <p>
            Mỹ phẩm authentic
            <br />
            Make you beautiful
          </p>
        </div>

        <div className="box">
          <h2>Về chúng tôi</h2>
          <ul>
            <li>Our Stores</li>
            <li>Our Cares</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="box">
          <h2>Chăm sóc khách hàng</h2>
          <ul>
            <li>Help Center </li>
            <li>How to Buy </li>
            <li>Track Your Order </li>
            <li>Corporate & Bulk Purchasing </li>
            <li>Returns & Refunds </li>
          </ul>
        </div>
        <div className="box">
          <h2>Liên hệ</h2>
          <ul>
            <li>Số nhà 59, ngõ 63-Trần Quốc Vượng </li>
            <li>Email: nvl@gmail.com</li>
            <li>Phone: 0989888666</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
