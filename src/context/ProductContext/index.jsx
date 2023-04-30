/* eslint-disable */
import { integerPropType } from "@mui/utils";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {toast} from "react-toastify";

export const ProductContext = React.createContext({});

export const useProduct = () => useContext(ProductContext);

export function ProductContextProvider({ children }) {
  const [CartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit) {
      setCartItem(
        CartItem.map((item) => {
          if (item.id === product.id) {
            return {
              ...productExit,
              qty: productExit.qty + 1,
            };
          }
          return item;
        })
      );
      toast.success(`+1 ${product.name}`)
    } else {
      toast.success(`Đã thêm mới sản phẩm ${product.name} vào giỏ hàng`)
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };
  // decrease to 0 or clear this item incart
  const removeItem = (product) => {
    setCartItem(CartItem.filter((item) => item.id !== product.id));
  };
  // clear all item in cart
  const clearItem = () => {
    localStorage.setItem("CartItem", JSON.stringify([]));
    setCartItem([]);
  };

  useEffect(() => {
    if (CartItem.length > 0) {
      localStorage.setItem("CartItem", JSON.stringify(CartItem));
    }
  }, [CartItem]);

  useEffect(() => {
    const CartItems = JSON.parse(localStorage.getItem("CartItem"));
    if (CartItems) {
      setCartItem(CartItems);
    }
  }, []);

  const value = useMemo(
    () => ({
      // productItems,
      // shopItems,
      addToCart,
      decreaseQty,
      removeItem,
      clearItem,
      CartItem,
      setCartItem
    }),
    // [CartItem, shopItems, productItems]
    [CartItem]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
