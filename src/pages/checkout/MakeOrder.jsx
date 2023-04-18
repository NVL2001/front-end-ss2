import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import { PublicLayout } from "../../layout/PublicLayout";
/*eslint-disable*/
function MakeOrder() {
  /*<div>
        <select id="province">
        <option value="" selected>Chọn tỉnh </option>           
        </select>
                
        <select id="district">
        <option value="" selected>Chọn quận huyện</option>
        </select>

        <select id="ward">
        <option value="" selected>Chọn phường xã</option>
        </select>
        </div> 


                <h2 id="result"></h2>


        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
            <script>
            const host = "https://provinces.open-api.vn/api/";
        var callAPI = (api) => {
            return axios.get(api)
                .then((response) => {
                    renderData(response.data, "province");
                });
        }
        callAPI('https://provinces.open-api.vn/api/?depth=1');
        var callApiDistrict = (api) => {
            return axios.get(api)
                .then((response) => {
                    renderData(response.data.districts, "district");
                });
        }
        var callApiWard = (api) => {
            return axios.get(api)
                .then((response) => {
                    renderData(response.data.wards, "ward");
                });
        }

        var renderData = (array, select) => {
            let row = ' <option disable value="">Chọn</option>';
            array.forEach(element => {
                row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`
            });
            document.querySelector("#" + select).innerHTML = row
        }

        $("#province").change(() => {
            callApiDistrict(host + "p/" + $("#province").find(':selected').data('id') + "?depth=2");
            printResult();
        });
        $("#district").change(() => {
            callApiWard(host + "d/" + $("#district").find(':selected').data('id') + "?depth=2");
            printResult();
        });
        $("#ward").change(() => {
            printResult();
        })

        var printResult = () => {
            if ($("#district").find(':selected').data('id') != "" && $("#province").find(':selected').data('id') != "" &&
                $("#ward").find(':selected').data('id') != "") {
                let result = $("#province option:selected").text() +
                    " | " + $("#district option:selected").text() + " | " +
                    $("#ward option:selected").text();
                $("#result").text(result)
            }

        }
	</script>*/
  //convert to react
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
  //  each time change the province, the district and ward,
  //  the result will be updated and displayed

  return (
    <div className="container d_flex">
      {/* <div className="sidebar">
      </div> */}
      <div className="main">
        {/* user information, ship option, checkout option, location */}
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
    </div>
  );
}
export default MakeOrder;
