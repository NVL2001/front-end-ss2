import React from "react";
import "./style.css";

function Wrapper() {
  const data = [
    {
      cover: <i className="fas fa-shipping-fast" />,
      title: "Ship toàn quốc",
      decs: "Thông qua các đơn vị giao hàng uy tín nhất Việt Nam.",
    },
    {
      cover: <i className="fas fa-thumbs-up" />,
      title: "Uy tín",
      decs: "Sản phẩm chuẩn chất lượng, đảm bảo an toàn tuyệt đối cho người dùng.",
    },
    {
      cover: <i className="fas fa-shield-alt" />,
      title: "Giá tốt",
      decs: "Giá cả cạnh tranh, hợp lý nhất thị trường.",
    },
    {
      cover: <i className="fas fa-headset" />,
      title: "Hỗ trợ 24/7  ",
      decs: "Luôn hỗ trợ khách hàng mọi lúc mọi nơi.",
    },
  ];
  return (
    <section className="wrapper background">
      <div className="container grid2">
        {data.map((val) => (
          <div className="product" key={val.title}>
            <div className="img icon-circle">
              <i>{val.cover}</i>
            </div>
            <h3>{val.title}</h3>
            <p>{val.decs}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Wrapper;
