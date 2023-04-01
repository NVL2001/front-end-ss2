import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Pages from './pages/Pages';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/productsDetail';
import User from './pages/User';
import Cart from './common/Cart/Cart';
import CategoryPage from './components/shops/CategoryPage';

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

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Pages} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/product" exact component={ProductPage} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/category/:id" component={CategoryPage} />
        <Route path="/user" exact component={User} />
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
  );
}

export default App;
