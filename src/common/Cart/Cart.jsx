import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useProduct } from "../../context/ProductContext";
import { PublicLayout } from "../../layout/PublicLayout";
import { APIRoutes } from "../../constants/APIRoutes";
import formatMoney from "../../utils/formatMoney";

/* eslint-disable*/
function CartComponent() {
  const { CartItem, addToCart, decreaseQty, removeItem, clearItem } =
    useProduct();
  const [cartProducts, setCartProducts] = useState([]);

  const [ttP, setTtp] = useState(0);
  function calculateTotalPrice(cartProducts, cartItems) {
    return cartItems.reduce((total, item) => {
      const product = cartProducts.find((p) => p.id === item.id);
      if (product) {
        const price = product.discountPrice ?? product.price;
        const quantity = item.qty;
        return total + price * quantity;
      } else {
        return total;
      }
    }, 0);
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const ids = CartItem.map((item) => item.id);
      console.log(ids);
      const response = await axios.post(APIRoutes.GET_MANY_PRODUCTS, ids);
      setCartProducts(response.data);
    };

    if (CartItem.length != 0) {
      fetchProduct();
    }
  }, [CartItem]); //phải thêm CartItem vào dependency để nó có data trước

  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  return (
    <section className="cart-items">
      <div className="container d_flex">
        <div className="cart-details">
          {CartItem.length === 0 && (
            <h1 className="no-items product">
              Không có sản phẩm trong giỏ hàng
            </h1>
          )}

          {cartProducts.length > 0 &&
            CartItem.map((item) => {
              const product = cartProducts.filter(
                (pro) => pro.id === item.id
              )[0];
              const subPriceTotal = product.discount
                ? product.discountPrice * item.qty
                : product.price * item.qty;

              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={`${
                          axios.defaults.baseURL + product.productImages[0]
                        }`}
                      />
                    </Link>
                  </div>

                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      {product.discount ? (
                        <span>
                          <p style={{ textDecoration: "line-through" }}>
                            {formatMoney(product.price)}
                          </p>
                          <span>{formatMoney(product.discountPrice)}</span>
                        </span>
                      ) : (
                        <span>{formatMoney(product.price)}</span>
                      )}
                      <span>* {item.qty}</span> {"     "}
                      <span>:</span> {"     "}
                      <span>{formatMoney(subPriceTotal)}</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="cartControl d_flex">
                      {/* clear this item */}
                      <button
                        className="removeCart"
                        onClick={() => removeItem(item)}
                      >
                        <i className="fas fa-trash" />
                      </button>
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        className="incItem"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fas fa-plus" />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price" />
                </div>
              );
            })}
        </div>

        <div className="cart-total product">
          <div className=" d_flex">
            <h2>Giỏ hàng</h2>
            <button id="removeAllcart--btn" onClick={() => clearItem()}>
              Xóa giỏ hàng <i className="fas fa-times-circle"> </i>
            </button>
          </div>
          <hr />
          <div className=" d_flex">
            <h2>Tạm tính :</h2>
            <h3>{formatMoney(calculateTotalPrice(cartProducts, CartItem))}</h3>
          </div>

          {/* checkout */}
          {/* <div className=""> */}
          <Link
            to={{
              pathname: "/checkout",
              state: {
                totalPrice: calculateTotalPrice(cartProducts, CartItem),
              },
            }}
          >
            <button className="btn-primary checkout">Mua hàng </button>
          </Link>
          {/* </div> */}
        </div>
      </div>
    </section>
  );
}

function Cart() {
  return (
    <PublicLayout>
      <CartComponent />
    </PublicLayout>
  );
}

export default Cart;
