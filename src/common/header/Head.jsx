import React from 'react';
import { Link } from 'react-router-dom';

function Head() {
  return (
    <section className="head">
      <div className="container d_flex ">
        <div className="left row">
          <i className="fa fa-phone" />
          <p> 0968809488</p>
          <i className="fa fa-envelope" />
          <p> nvl@gmail.com</p>
          {/* MAIL TO */}
        </div>
        <div className="center row">
          <h1>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'white',
              }}
            >
              Rose Secret
            </Link>
          </h1>
        </div>
        <div className="right row RText">
          {/* <label>Theme FAQ"s</label>
            <label>Need Help?</label>

            <label>EN</label>

            <label>USD</label> */}
          {/* logo facebook insta zalo fontawesomne */}
          {/* <span>🏳️</span>
            <label>Đăng nhập</label>
            <span>🏳️</span>
            <label>Đăng ký</label> */}
          <i className="fab fa-facebook-square" />
          <i className="fab fa-instagram-square" />
          <i className="fab fa-twitter" />
        </div>
      </div>
    </section>
  );
}

export default Head;
