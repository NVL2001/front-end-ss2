import React from "react";

function Catg() {
  return (
    <div className="panel">
      <ul className="no-bullets">
        <li>
          <i className="fa fa-long-arrow-right" />
          <a href="/collections/trang-diem">TRANG ĐIỂM</a>

          <ul className="no-bullets">
            <li>
              <a href="/collections/son-thoi"> Son Thỏi</a>
            </li>

            <li>
              <a href="/collections/son-kem"> Son Kem</a>
            </li>

            <li>
              <a href="/collections/son-duong"> Son Dưỡng</a>
            </li>

            <li>
              <a href="/collections/phan-phu-bot-phan-nen-phan-nuoc">
                {" "}
                Phấn Phủ Bột/Phấn Nén/Phấn Nước
              </a>
            </li>

            <li>
              <a href="/collections/kem-lot"> Kem Lót</a>
            </li>

            <li>
              <a href="/collections/kem-che-khuyet-diem">
                {" "}
                Kem Che Khuyết Điểm
              </a>
            </li>

            <li>
              <a href="/collections/mau-mat"> Màu Mắt</a>
            </li>

            <li>
              <a href="/collections/vien-mat-chi-may-mascara">
                {" "}
                Viền Mắt/Chỉ Mày/Mascara
              </a>
            </li>

            <li>
              <a href="/collections/kem-nen"> Kem Nền</a>
            </li>

            <li>
              <a href="/collections/tao-khoi-hieu-ung"> Tạo Khối / Hiệu Ứng</a>
            </li>
          </ul>
        </li>

        <li>
          <i className="fa fa-long-arrow-right" />
          <a href="/collections/duong-da">DƯỠNG DA</a>

          <ul className="no-bullets">
            <li>
              <a href="/collections/kem-duong"> Kem Dưỡng</a>
            </li>

            <li>
              <a href="/collections/tinh-chat"> Tinh Chất/Serum</a>
            </li>

            <li>
              <a href="/collections/mat-na"> Mặt Nạ</a>
            </li>

            <li>
              <a href="/collections/nuoc-can-bang">
                {" "}
                Nước Cân Bằng/Toner/Nước Hoa Hồng
              </a>
            </li>

            <li>
              <a href="/collections/kem-chong-nang"> Kem Chống Nắng</a>
            </li>

            <li>
              <a href="/collections/xit-khoang"> Xịt Khoáng</a>
            </li>

            <li>
              <a href="/collections/kem-mat"> Kem Mắt</a>
            </li>

            <li>
              <a href="/collections/sua-duong"> Sữa Dưỡng</a>
            </li>

            <li>
              <a href="/collections/kem-mat-xa"> Kem Massage</a>
            </li>

            <li>
              <a href="/collections/combo-duong-da"> Combo Dưỡng Da</a>
            </li>

            <li>
              <a href="/collections/tri-lieu"> Trị Liệu</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Catg;
