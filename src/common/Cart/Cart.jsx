import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import { PublicLayout } from "../../layout/PublicLayout";
/* eslint-disable react/jsx-one-expression-per-line */
function CartComponent() {
  const { CartItem, addToCart, decreaseQty } = useProduct();
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  return (
    <section className="cart-items">
      <div className="container d_flex">
        <div className="cart-details">
          {CartItem.length === 0 && (
            <h1 className="no-items product">No Items are add in Cart</h1>
          )}

          {CartItem.map((item) => {
            const subPriceTotal = item.price * item.qty;

            return (
              <div className="cart-list product d_flex" key={item.id}>
                <div className="img">
                  <Link to={`/products/${item.id}`}>
                    <img src={`http://${item.productImages[0]}`} />
                  </Link>
                </div>

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <h4>
                    {item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                    * {item.qty}
                    <span>:</span>
                    <span>
                      {subPriceTotal
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      VND
                    </span>
                  </h4>
                </div>
                <div className="cart-items-function">
                  <div className="removeCart">
                    <button className="removeCart">
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>

                  <div className="cartControl d_flex">
                    <button className="incCart" onClick={() => addToCart(item)}>
                      <i className="fas fa-plus" />
                    </button>
                    <button
                      className="desCart"
                      onClick={() => decreaseQty(item)}
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>

                <div className="cart-item-price" />
              </div>
            );
          })}
        </div>

        <div className="cart-total product">
          <h2>Giỏ hàng</h2>
          <div className=" d_flex">
            <h4>Tổng cộng :</h4>
            <h3>
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              VND
            </h3>
          </div>

          {/* checkout */}
          <div className="checkout--button">
            <button>Thanh toán </button>
            {/* <i class="fas fa-arrow-right"> </i> */}
          </div>
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
