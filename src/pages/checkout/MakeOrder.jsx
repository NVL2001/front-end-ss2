import React, { useState } from "react";
// cart css
import "./MakeOrder.css";
import { Link } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import { PublicLayout } from "../../layout/PublicLayout";
/*eslint-disable*/
function MakeOrder() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  //   const host = "https://provinces.open-api.vn/api/";
  React.useEffect(() => {
    const getProvinces = async () => {
      const response = await fetch(
        "https://provinces.open-api.vn/api/?depth=1"
      );
      const data = await response.json();
      setProvinces(data);
    };
    getProvinces();
  }, []);
  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    const getDistricts = async () => {
      const response = await fetch(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
      );
      const data = await response.json();
      setDistricts(data.districts);
    };
    getDistricts();
  };

  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    const getWards = async () => {
      const response = await fetch(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
      );
      const data = await response.json();
      setWards(data.wards);
    };
    getWards();
  };
  // add active breadcrumb item when at the current page
  const breadcrumb = document.querySelectorAll(".breadcrumb a");
  breadcrumb.forEach((item) => {
    if (item.href === window.location.href) {
      item.classList.add("active");
    }
  });
  const { CartItem, addToCart, decreaseQty, removeItem, clearItem } =
    useProduct();
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  return (
    <div className="container d_flex checkout">
      {/* breadcum */}
      <div className="breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span>|</span>
        <Link to="/cart">Giỏ hàng</Link>
        <span>|</span>
        <Link to="/checkout">Thanh toán</Link>
      </div>

      <div className="main">
        {/* user information, ship option, checkout option, location */}
        <div className="user-info">
          <h1>Thông tin giao hàng</h1>
          <p>Bạn đã có tài khoản? Đăng nhập</p>
          <form>
            <div className="form-group">
              <label htmlFor="name">Họ và tên</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Nhập địa chỉ"
              />
            </div>
            {/* option choose province, district, town */}
            <div className="form-group">
              <label htmlFor="province">Tỉnh/Thành phố</label>
              <select
                className="form-control"
                id="province"
                onChange={handleProvinceChange}
              >
                <option value="" selected>
                  Chọn tỉnh{" "}
                </option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>

              <label htmlFor="district">Quận/Huyện</label>
              <select
                className="form-control"
                id="district"
                onChange={handleDistrictChange}
              >
                <option value="" selected>
                  Chọn quận/huyện{" "}
                </option>
                {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>

              <label htmlFor="ward">Phường/Xã</label>
              <select className="form-control" id="ward">
                <option value="" selected>
                  Chọn phường/xã{" "}
                </option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>
            {/* result location */}
            <h2 id="result"></h2>

            <div className="form-group">
              <label htmlFor="note">Ghi chú</label>
              <textarea
                className="form-control"
                id="note"
                rows="3"
                placeholder="Nhập ghi chú"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="note">Phương thức thanh toán</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="payment1"
                  value="option1"
                  checked
                />
                <label className="form-check-label" htmlFor="payment1">
                  Thanh toán khi nhận hàng
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="payment3"
                  value="option3"
                />
                <label className="form-check-label" htmlFor="payment3">
                  Thanh toán qua ví điện tử
                </label>
              </div>
            </div>
          </form>
        </div>
        {/* order summary */}
        <div className="order-summary">
          <h1>Đơn hàng</h1>
          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">
                Không có sản phẩm trong giỏ hàng
              </h1>
            )}

            {CartItem.map((item) => {
              const subPriceTotal = item.price * item.qty;

              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <span className="count">{item.qty}</span>
                  <div className="img">
                    {/* <Link to={`/product/${item.id}`}> */}
                    <img src={`http://${item.productImages[0]}`} />
                    {/* </Link> */}
                  </div>

                  <div className="cart-details">
                    <h3>{item.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* total quantity */}
          <div className="total-detail">
            <h3>Tạm tính :</h3>
            <h4>
              <span>{CartItem.reduce((qty, item) => qty + item.qty, 0)}</span>{" "}
              sản phẩm =
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              VND
            </h4>
            <h4>Phí vận chuyển : 25000 VND</h4>
            <h3>Tổng cộng :</h3>
            <h4>
              {(totalPrice + 25000)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              VND
            </h4>
          </div>

          <button className="btn btn-primary">Đặt hàng</button>
        </div>
      </div>
    </div>
  );
}
export default MakeOrder;
