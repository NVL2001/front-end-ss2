import React from "react";
import { Link } from "react-router-dom";
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
        </div>

        <div className="box">
          <h2>Về chúng tôi</h2>
          <ul>
            <li>
              <Link to="/about"> Giới thiệu</Link>
            </li>
            <li>
              <Link to="/about"> Cộng tác viên Mỹ Phẩm</Link>
            </li>
            <li>
              <Link to="/about"> Ưu đãi khách hàng thân thiết</Link>
            </li>
            <li>
              <Link to="/about">Hợp tác kinh doanh</Link>
            </li>
          </ul>
        </div>
        <div className="box">
          <h2>Chăm sóc khách hàng</h2>
          <ul>
            <li>
              <Link to="/about"> Theo dõi đơn hàng</Link>
            </li>
            <li>
              <Link to="/about"> Chính sách đổi trả</Link>
            </li>
            <li>
              <Link to="/about"> Bảo mật thông tin</Link>
            </li>
            <li>
              <Link to="/about">Hướng dẫn mua hàng</Link>
            </li>
          </ul>
        </div>
        <div className="box">
          <h2>Liên hệ</h2>
          <ul>
            <li>Số nhà 59, ngõ 63 - Trần Quốc Vượng, Cầu Giấy, Hà Nội </li>
            <li>Email: nvl@gmail.com</li>
            <li>Phone: 0365000282</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
