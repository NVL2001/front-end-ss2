import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import Data from '../../components/Data';
import Sdata from '../../components/shops/Sdata';

export const ProductContext = React.createContext({});

export const useProduct = () => useContext(ProductContext);

export function ProductContextProvider({ children }) {
  const [CartItem, setCartItem] = useState([]);

  const { productItems } = Data;
  const { shopItems } = Sdata;

  const addToCart = (product, quantity) => {
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit) {
      setCartItem(CartItem.map((item) => {
        if (item.id === product.id) {
          return {
            ...productExit,
            qty: quantity ? productExit.qty + quantity : productExit.q + 1,
          };
        }
        return item;
      }));
    } else {
      setCartItem([...CartItem, { ...product, qty: quantity || 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(CartItem.map((item) => {
        if (item.id === product.id) {
          return {
            ...productExit,
            qty: productExit.q - 1,
          };
        }
        return item;
      }));
    }
  };

  useEffect(() => {
    if (CartItem.length > 0) {
      localStorage.setItem('cartItem', JSON.stringify(CartItem));
    } else {
      localStorage.setItem('cartItem', JSON.stringify([]));
    }
  }, [CartItem]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItem'));
    if (cartItems) {
      setCartItem(cartItems);
    }
  }, []);

  const value = useMemo(() => ({
    productItems,
    shopItems,
    addToCart,
    decreaseQty,
    CartItem,
  }), [CartItem, shopItems, productItems]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}
