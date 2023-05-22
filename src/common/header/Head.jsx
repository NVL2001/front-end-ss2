import React from "react";
import { Link } from "react-router-dom";

function Head() {
  return (
    <section className="head">
      <div className="container d_flex ">
        <div className="left row">
          <i className="fa fa-phone" />
          <label> 0968809488</label>
          <i className="fa fa-envelope" />
          <label> nvl@gmail.com</label>
        </div>
        <div className="center row">
          <p>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Rose Secret
            </Link>
          </p>
        </div>
        <div className="right row RText">
          {/* <label>Theme FAQ's</label>
            <label>Need Help?</label>

            <label>EN</label>

            <label>USD</label> */}
          {/* logo facebook insta zalo fontawesomne */}
          {/* <span>🏳️</span>
            <label>Đăng nhập</label>
            <span>🏳️</span>
            <label>Đăng ký</label> */}
          <a target="blank" href="http://facebook.com/rosesecret.cosmetic">
            <i className="fab fa-facebook-square" />
          </a>
          <a target="blank" href="http://instagram.com/rosesecret.cosmetic">
            <i className="fab fa-instagram-square" />
          </a>
          <a target="blank" href="http://twitter.com">
            <i className="fab fa-twitter" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Head;
