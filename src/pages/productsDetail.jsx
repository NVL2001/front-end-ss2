import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetail.css";
function ProductDetail(props,{addToCart}) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    const id = props.match.params.id;
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/product/get-product/${id}`
      );
      setProduct(response.data);
    };
    fetchData();
  }, [props.match.params.id]);
  
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };




  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="product-detail">
        <img
          src={`http://${product.productImages[0]}`}
          alt={product.name}
          className="product-image"
        />
        <div className="rightside">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: {product.price} vnd</p>
          <div className="quantity-controls">
            <button onClick={handleDecrement} >-</button>
			<span>{quantity}</span>
            <button onClick={handleIncrement}>+</button>
            <button className="add"  >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {/* <div class="grid__item large--nine-twelfths medium--eight-twelfths small--one-whole md-pd-left10">
					<div class="grid product-single">
						
						
						
						<div class="grid__item large--one-half text-center">
							<div class="product-single__photos">
								<div id="ProductPhoto" class="owl-carousel owl-theme d-flex-owl owl-loaded" data-allin="1">
									
								<div class="owl-stage-outer"><div class="owl-stage"></div></div></div>
							</div>
							
						</div>

						<div class="grid__item large--one-half product-page">
							<h1>Nước hoa hồng trắng da kim cương Pretty Skin Pure Brightening Diamond Toner</h1>
							<p class="product-more-info">
								
							</p>
							<div class="product-info grid">
								<div class="grid__item one-whole">
									<p class="line-price">
										<span class="price-text">Giá: </span>
										<span id="ProductPrice" class="ProductPrice" itemprop="price" content="240000">240,000₫</span>									
										
									</p>
								</div>
							</div>

							<div id="product-single-details">
								<div class="product-description rte">
									<ul>
										
										<li>Thương hiệu: <a href="/collections/vendors?q=prettyskin&amp;view=vendor-alt">PrettySkin</a></li>
										
										
										<li>Dòng sản phẩm: <a href="/collections/types?q=duong-da&amp;view=type-alt">DƯỠNG DA</a></li>
										
										
										
										<li>Giảm 5% Khách cũ, Miễn Ship đơn 500K</li>
										
										
										<li>Mua Ngay Trả Sau Lãi 0%</li>
										
										
										<li>Đồng Giá 25K Ship COD toàn quốc đơn dưới 500K, Miễn Phí Đổi Trả Lỗi Bất Kỳ</li>
										
									</ul>
								</div>
								<form action="/cart/add" method="post" enctype="multipart/form-data" id="AddToCartForm" class="form-vertical">
									<div class="selector-wrapper" style="display: none;"><label for="productSelect-option-0">Tiêu đề</label><select class="single-option-selector" data-option="option1" id="productSelect-option-0"><option value="Default Title">Default Title</option></select></div><select name="id" id="productSelect" class="product-single__variants hide" style="display: none;">
										
										
										<option selected="selected" data-sku="" value="1099751502">Default Title - 240,000 VND</option>
										
										
									</select>
									<div id="product-select-watch" class="select-swatch">
										
									</div>
									
									<div class="qty-addcart clearfix">
										<p for="Quantity" class="quantity-selector">Số lượng:</p>
										
	
	<div class="js-qty">
		<button type="button" class="js-qty__adjust js-qty__adjust--minus icon-fallback-text" data-id="" data-qty="0">
			<span class="icon icon-minus" aria-hidden="true"></span>
			<span class="fallback-text" aria-hidden="true">−</span>
			<span class="visually-hidden">Giảm số lượng sản phẩm đi 1</span>
		</button>
		<input type="text" class="js-qty__num" value="1" min="1" data-id="" aria-label="quantity" pattern="[0-9]*" name="quantity" id="Quantity"/>
		<button type="button" class="js-qty__adjust js-qty__adjust--plus icon-fallback-text" data-id="" data-qty="11">
			<span class="icon icon-plus" aria-hidden="true"></span>
			<span class="fallback-text" aria-hidden="true">+</span>
			<span class="visually-hidden">Tăng số lượng sản phẩm lên 1</span>
		</button>
	</div>
	

									</div>
										

									<div class="btn-product-page">
										
										<button type="submit" name="add" id="AddToCart" class="btn">Thêm vào giỏ hàng</button>
										<button name="buy" id="buy-now" class="btn">Mua ngay</button>
																			
									</div>						
								</form>
							</div>
						</div>
					</div>

					<div class="product-tabs add-height-img">
						<div class="ajax-tab">
							
						<div class="tab clearfix">
							
							<button class="pro-tablinks" onclick="openProTabs(event, 'protab1')" id="defaultOpenProTabs">Mô tả chi tiết</button>
							
							
															
							<button class="pro-tablinks" onclick="openProTabs(event, 'protab3')">Đánh giá</button>
															
															
							<button class="pro-tablinks active" onclick="openProTabs(event, 'proCom')">Bình luận</button>
														
						</div>
						
						<div id="protab1" class="pro-tabcontent" style="display: none;">
							
						</div>
						
						
						
						<div id="protab3" class="pro-tabcontent" style="display: none;">
							
						</div>
						
						</div>
						
						<div id="proCom" class="pro-tabcontent" style="display: block;">
							<div class="fb-comments fb_iframe_widget fb_iframe_widget_fluid_desktop" data-href="https://myphamphutho.vn/products/nuoc-hoa-hong-trang-da-kim-cuong-pretty-skin-pure-brightening-diamond-toner" data-width="100%" data-numposts="5" fb-xfbml-state="rendered" fb-iframe-plugin-query="app_id=&amp;container_width=0&amp;height=100&amp;href=https%3A%2F%2Fmyphamphutho.vn%2Fproducts%2Fnuoc-hoa-hong-trang-da-kim-cuong-pretty-skin-pure-brightening-diamond-toner&amp;locale=vi_VN&amp;numposts=5&amp;sdk=joey&amp;version=v8.0&amp;width=" style="width: 100%;"><span style="vertical-align: bottom; width: 100%; height: 204px;"><iframe name="f33f305a88b1d34" width="1000px" height="100px" data-testid="fb:comments Facebook Social Plugin" title="fb:comments Facebook Social Plugin" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" src="https://www.facebook.com/v8.0/plugins/comments.php?app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df3480def25c4ea8%26domain%3Dmyphamphutho.vn%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fmyphamphutho.vn%252Ff1e98b962cd51ac%26relation%3Dparent.parent&amp;container_width=0&amp;height=100&amp;href=https%3A%2F%2Fmyphamphutho.vn%2Fproducts%2Fnuoc-hoa-hong-trang-da-kim-cuong-pretty-skin-pure-brightening-diamond-toner&amp;locale=vi_VN&amp;numposts=5&amp;sdk=joey&amp;version=v8.0&amp;width=" style="border: none; visibility: visible; width: 100%; height: 204px;" class=""></iframe></span></div>
						</div>
						
					</div>
				</div> */}
    </>
  );
}

export default ProductDetail;
