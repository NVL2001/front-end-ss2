import React from "react";
import { PublicLayout } from "../../layout/PublicLayout";
import "./about.css";
import img1 from "./assets/img/about/1.jpg";
import img2 from "./assets/img/about/2.jpg";
import img3 from "./assets/img/about/3.jpg";
import img4 from "./assets/img/about/4.jpg";

function About() {
  return (
    <div classNameName="container--about">
      <section className="page-section" id="about">
        <h1>Giới thiệu</h1>
        <div className="container">
          <ul className="timeline">
            <li>
              <div className="timeline-image">
                <img className="rounded-circle img-fluid" src={img1} alt="" />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>2009-2011</h4>
                  <h4 className="subheading">Startup</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    Từ những ngày đầu, tôi khởi nghiệp với những thứ đơn giản
                    nhất, nhưng lại là những thứ mà tôi yêu thích. Tôi bắt đầu
                    với việc bán các sản phẩm mỹ phẩm, chăm sóc sắc đẹp, chăm
                    sóc da, chăm sóc tóc, chăm sóc cơ thể,... Với nguồn vốn ít
                    ỏi, tôi đã bắt đầu kinh doanh với một số lượng sản phẩm nhỏ,
                    nhưng tôi đã cố gắng bán hết chúng. Tôi đã bán hàng cho bạn
                    bè, gia đình và những người tôi biết, và những khách hàng
                    trong khu vực tôi sinh sống.
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <img className="rounded-circle img-fluid" src={img2} alt="" />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>Tháng 5 2014</h4>
                  <h4 className="subheading">Gian hàng đầu tiên</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    Ban đầu, tối chỉ nhập số ít các sản phẩm mà người dùng hay
                    mua, nhưng sau đó tôi đã mở rộng thêm các sản phẩm khác. Tôi
                    đã có cho mình một gian hàng nhỏ, và tôi tiếp tục bán hàng
                    trực tuyến.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="timeline-image">
                <img className="rounded-circle img-fluid" src={img3} alt="" />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>Tháng 2 , 2017</h4>
                  <h4 className="subheading">Cửa hàng đầu tiên</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    Sau khi tôi đã có số vốn đủ lớn, tôi đã mở một cửa hàng nhỏ,
                    và tôi đã bắt đầu bán hàng trực tiếp kết hợp với bán hàng
                    trực tuyến. Tôi đã mở rộng thêm các sản phẩm khác, và tôi đã
                    có một số lượng khách hàng đáng kể. Tôi đã thuê thêm nhân
                    viên, và có rất nhiều cộng tác viên khách sỉ và khách lẻ.
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <img className="rounded-circle img-fluid" src={img4} alt="" />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>2019</h4>
                  <h4 className="subheading">Mở rộng</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted">
                    Không dừng lại ở đó, chúng tôi đã phát triển hệ thống cửa
                    hàng với hai chi nhánh tại Hà Nội và Thành phố Hồ Chí Minh.
                    Chúng tôi đã mở rộng thêm các sản phẩm khác, và chúng tôi có
                    hàng trăm khách sỉ và cộng tác viên.
                  </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <h4>
                  <br />
                  <i className="fa fa-heart " />
                </h4>
              </div>
            </li>
          </ul>
        </div>

        <h1>Khách hàng thân thiết</h1>
        <div className="container--text">
          <p>
            Chúng tôi luôn đặt lợi ích của khách hàng lên hàng đầu, và chúng tôi
            luôn cố gắng để đáp ứng nhu cầu của khách hàng. Chúng tôi luôn cố
            gắng để đem đến cho khách hàng những sản phẩm tốt nhất, và ưu đãi
            tốt nhất. Với những khách hàng mua sản phẩm của chúng tôi với hóa
            đơn trên 2 triệu đồng sẽ trở thành khách hàng thân thiết của chúng
            tôi, và sẽ được hưởng những ưu đãi đặc biệt như giảm từ 10-20% tổng
            hóa đơn.
          </p>
        </div>

        <h1>Chính sách bảo mật</h1>
        <div className="container--text">
          <p>
            Thông tin của khách hàng sẽ được bảo mật tuyệt đối, và sẽ không được
            tiết lộ cho bất kỳ bên thứ ba nào. Chúng tôi chỉ sử dụng thông tin
            của khách hàng để giao hàng, và liên lạc với khách hàng khi cần
            thiết.
          </p>
        </div>

        <h1>Chính sách đổi trả</h1>
        <div className="container--text">
          <p>
            Chúng tôi cam kết đổi trả sản phẩm nếu sản phẩm bị lỗi do nhà sản
            xuất, hoặc do vận chuyển. Chúng tôi sẽ đổi trả sản phẩm trong vòng 7
            ngày kể từ ngày mua hàng. Chúng tôi sẽ không đổi trả sản phẩm nếu
            sản phẩm bị hư hỏng do người dùng sử dụng không đúng cách, hoặc do
            người dùng tự ý thay đổi sản phẩm.
          </p>
        </div>

        <h1>Chính sách vận chuyển</h1>
        <div className="container--text">
          <p>
            Chúng tôi cam kết giao hàng đúng hẹn, và giao hàng đến tận tay khách
            hàng. Chúng tôi sẽ không giao hàng đến những địa chỉ không có tên
            người nhận, hoặc những địa chỉ không có người nhận. Chúng tôi sẽ
            không giao hàng đến những địa chỉ không có số điện thoại liên lạc.
            Khách hàng cũng có thể tới cửa hàng để nhận hàng.
          </p>
        </div>

        <h1>Chính sách thanh toán</h1>
        <div className="container--text">
          <p>
            Chúng tôi cam kết nhận thanh toán bằng tiền mặt, hoặc chuyển khoản
            qua ngân hàng. Chúng tôi sẽ không nhận thanh toán bằng thẻ tín dụng,
            hoặc thẻ ATM.
          </p>
        </div>

        <h1>Hợp tác kinh doanh</h1>
        <div className="container--text">
          <p>
            Chúng tôi luôn chào đón những cộng tác viên, những khách sỉ, và
            những đối tác kinh doanh. Chúng tôi luôn sẵn sàng hợp tác với những
            đối tác kinh doanh, và chúng tôi sẽ có những chính sách ưu đãi đặc
            biệt cho những đối tác kinh doanh. Nếu bạn có nhu cầu hợp tác kinh
            doanh với chúng tôi, vui lòng liên hệ với chúng tôi qua zalo:
            0987654321.
          </p>
        </div>

        <h1>Theo dõi đơn hàng</h1>
        <div className="container--text">
          <p>
            Chúng tôi sẽ cập nhật tình trạng đơn hàng của bạn qua tin nhắn SMS,
            hoặc qua email. Nếu bạn có bất kỳ thắc mắc nào về đơn hàng, vui lòng
            liên hệ với chúng tôi qua zalo: 0987654321.
          </p>
        </div>
      </section>
    </div>
  );
}

function AboutUs() {
  return (
    <PublicLayout>
      <About />
    </PublicLayout>
  );
}

export default AboutUs;
