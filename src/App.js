import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Pages from './pages/Pages';
import ProductPage from './pages/product/ProductPage';
import ProductDetail from './pages/product/productsDetail';
import User from './pages/user/User';
import Cart from './common/Cart/Cart';
import CategoryPage from './components/shops/CategoryPage';
import AboutUs from './components/about/about';
import MakeOrderPage from './pages/checkout/MakeOrderPage';

import './infra/http';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from "./admin/scenes/dashboard/DashBoard";
import Categories from "./admin/scenes/categories/Categories";
import Products from "./admin/scenes/products/Products";
import InputProduct from "./admin/scenes/products/InputProduct";
import Orders from "./admin/scenes/orders";
import Team from "./admin/scenes/team/Team";
import Form from "./admin/scenes/form";
import Bar from "./admin/scenes/bar";
import Pie from "./admin/scenes/pie";
import Line from "./admin/scenes/line";
import FAQ from "./admin/scenes/faq";
import Calendar from "./admin/scenes/calendar/calendar";
import { ProductContextProvider } from "./context/ProductContext";
import { AuthContextProvider } from "./context/AuthContext";
import OrderPage from "./pages/order/OrderPage";

function App() {
  return (
    <AuthContextProvider>
      <ToastContainer />
      <ProductContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Pages} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/checkout" exact component={MakeOrderPage} />
            <Route path="/product" exact component={ProductPage} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/category/:id" component={CategoryPage} />
            <Route path="/order" component={OrderPage} />
            <Route path="/user" exact component={User} />
            <Route path="/about" exact component={AboutUs} />
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin/categories" component={Categories} />
            <Route path="/admin/products" component={Products} />
            <Route path="/admin/products/add" component={InputProduct} />
            <Route path="/admin/orders" component={Orders} />
            <Route path="/admin/team" component={Team} />
            <Route path="/admin/form" component={Form} />
            <Route path="/admin/bar" component={Bar} />
            <Route path="/admin/pie" component={Pie} />
            <Route path="/admin/line" component={Line} />
            <Route path="/admin/faq" component={FAQ} />
            <Route path="/admin/calendar" component={Calendar} />
            <Route path="/admin/geography" component={Calendar} />
          </Switch>
        </Router>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default App;
