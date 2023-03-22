import React, { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import ProductPage from "./pages/ProductPage"
import ProductDetail from "./pages/productsDetail"
import User from "./pages/User";
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"


function App() {
  /*
  lai pass garne using props
  
  Step 2 : item lai cart ma halne using useState
  ==> CartItem lai pass garre using props from  <Cart CartItem={CartItem} /> ani import garrxa in cartItem ma
 
  Step 3 :  chai flashCard ma xa button ma

  Step 4 :  addToCart lai chai pass garne using props in pages and cart components
  */

  //Step 1 :
  // const { productItems } = Data


  //Step 2 :
  const [CartItem, setCartItem] = useState([])

  //Step 4 :

  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
    const cartItems = CartItem.slice()
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }

  // Step: 6
  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }

  return (
    <>
      <Router>
        <Header CartItem={CartItem} />
        <Switch>
          <Route path='/' exact>
            <Pages addToCart={addToCart} />
          </Route>

          <Route path='/cart' exact>
            <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
          </Route>

          <Route path='/product' exact>
            <ProductPage addToCart={addToCart} />
          </Route>
          <Route path="/products/:id" component={ProductDetail} addToCart={addToCart} />
          {/* <Route path='/products/:id' exact>
            <ProductDetail addToCart={addToCart} />
          </Route> */}

          <Route path='/user' exact>
            <User />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default App
