/*eslint-disable*/

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./MakeOrder.css";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useProduct } from "../../context/ProductContext";
import { makeOrder } from "../../api/order";
import formatMoney from "../../utils/formatMoney";
import { APIRoutes } from "../../constants/APIRoutes";

function MakeOrder() {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [wards, setWards] = useState([]);
  const [submitData, setSubmitData] = useState({});
  const { clearItem } = useProduct();
  let location = useLocation();
  const history = useHistory();
  const subPrice = location.state.totalPrice;
  //   const host = "https://provinces.open-api.vn/api/";
  useEffect(() => {
    const getProvinces = async () => {
      const response = await fetch(
        "https://provinces.open-api.vn/api/?depth=1"
      );
      const data = await response.json();
      setProvince(data);
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
      setDistrict(data.districts);
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
  const { CartItem } = useProduct();

  function queryAddressData(id) {
    const selectElement = document.getElementById(id);
    const selectedValue = selectElement.value;
    const selectedOption = selectElement.querySelector(
      `[value="${selectedValue}"]`
    );
    const selectedContent = selectedOption.textContent;

    return selectedContent;
  }

  const handleSubmit = async (e) => {
    if (CartItem.length == 0) {
      toast.error("Không có sản phẩm trong giỏ hàng");
      return;
    }
    const address = document.getElementById("address").value;
    const phoneNumber = document.getElementById("phone").value;

    const addressArray = ["province", "district", "wards"];
    let addressObject = {};
    for (let i = 0; i < addressArray.length; i++) {
      addressObject = {
        ...addressObject,
        [addressArray[i]]: queryAddressData(addressArray[i]),
      };
    }

    const items = CartItem.map((item) => {
      return {
        productId: item.id,
        quantity: item.qty,
      };
    });
    const data = {
      ...addressObject,
      address,
      items,
      phoneNumber,
    };

    console.log(data);
    try {
      const request = await axios.post(APIRoutes.MAKE_ORDER, data);
      if (request.status === 200) {
        toast.success("Đặt hàng thành công");
        clearItem();
        history.push("/order");
      }
    } catch (error) {
      console.log(error);
      toast.error("Đặt hàng thất bại");
    }
  };
  const [totalPrice, setTotalPrice] = useState(subPrice);
  /**
   * if checked payment1, show the shippingFee, plus shippingFee to totalPrice
   * if checked payment2, set the shippingFee = 0
   */
  // const [paymentOption, setPaymentOption] = useState("payment1");
  // const [shippingFee, setShippingFee] = useState(25000);
  // const [totalPrice, setTotalPrice] = useState(subPrice + shippingFee);
  // const handlePaymentOptionChange = (event) => {
  //   setPaymentOption(event.target.value);
  //   if (event.target.value === "payment1") {
  //     setShippingFee(25000);
  //     setTotalPrice(25000 + subPrice);
  //   } else {
  //     setShippingFee(0);
  //     setTotalPrice(subPrice);
  //   }
  // };

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
          <p>Bạn đã có tài khoản? Đăng nhập ngay</p>
          <form autoComplete="off">
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
                placeholder="Nhập địa chỉ chi tiết"
              />
              <div className="address">
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
                    {province.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="district">Quận/Huyện</label>
                  <select
                    className="form-control"
                    id="district"
                    onChange={handleDistrictChange}
                  >
                    <option value="" selected>
                      Chọn quận/huyện{" "}
                    </option>
                    {district.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>{" "}
                <div className="form-group">
                  <label htmlFor="ward">Phường/Xã</label>
                  <select className="form-control" id="wards">
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
              </div>
            </div>
            {/* option choose province, district, town */}

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
            <h2>Phương thức thanh toán</h2>
            <div className="form-group" id="check--option">
              <div className="form-check">
                <input
                  // onChange={handlePaymentOptionChange}
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="payment1"
                  value="payment1"
                  checked
                />
                <label className="form-check-label" htmlFor="payment1">
                  Thanh toán khi nhận hàng
                </label>
              </div>
              <div className="form-check">
                <input
                  // onChange={handlePaymentOptionChange}
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="payment2"
                  value="payment2"
                />
                <label className="form-check-label" htmlFor="payment2">
                  Nhận tại cửa hàng
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
                <div className="cart-list product" key={item.id}>
                  <span className="count">{item.qty}</span>
                  <div className="img">
                    <img
                      src={`${axios.defaults.baseURL + item.productImages[0]}`}
                    />
                  </div>

                  <div className="item-name">
                    <h3>{item.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          {/* total quantity */}
          <div className="total-detail">
            {/* <span>
              {" "}
              <h3>Tạm tính :</h3>
              <h4 id="subTotal">
                {formatMoney(subPrice)}
              </h4>
            </span> */}

            {/* <span>
              <h3>Phí vận chuyển : </h3>
              <h4 id="shippingFee">{formatMoney(shippingFee)}</h4>
            </span> */}
            <span>
              <h3>Tổng cộng :</h3>
              <h4 id="totalPrice">{formatMoney(totalPrice)}</h4>
            </span>
          </div>
          <div className="submit--btn">
            {/*<Link to="/order">*/}
            <button
              className="btn btn-primary"
              onClick={() => {
                handleSubmit();
              }}
            >
              Đặt hàng
            </button>
            {/*</Link>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MakeOrder;
