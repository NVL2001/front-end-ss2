/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Pages from './pages/Pages';
import ProductPage from './pages/product/ProductPage';
import ProductDetail from './pages/product/productsDetail';
import User from './pages/user/User';
import MakeOrderPage from './pages/checkout/MakeOrderPage';
import Cart from './common/Cart/Cart';
import CategoryPage from './components/shops/CategoryPage';
import AboutUs from './components/about/about';

import './infra/http';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from "./admin/scenes/dashboard/DashBoard";
import Categories from "./admin/scenes/categories/Categories";
import Products from "./admin/scenes/products/Products";
import AddProductForm from "./admin/scenes/products/AddProductForm";

import Orders from "./admin/scenes/orders";
import Team from "./admin/scenes/team/Team";
import Form from "./admin/scenes/form";
import Bar from "./admin/scenes/bar";
import Pie from "./admin/scenes/pie";
import Line from "./admin/scenes/line";
import FAQ from "./admin/scenes/faq";
import Statistics from './admin/scenes/statistics/Statistics';
import Calendar from "./admin/scenes/calendar/calendar";
import { ProductContextProvider } from "./context/ProductContext";
import { AuthContextProvider } from "./context/AuthContext";
import Discounts from './admin/scenes/discounts/Discounts';
import AppliedProducts from './admin/scenes/discounts/AppliedProducts';
import AddCategoryForm from './admin/scenes/categories/AddCategoryForm';
// import ProductDetails from './admin/scenes/products/ProductDetails';
import AddDiscountForm from './admin/scenes/discounts/AddDiscountForm';
import AddProdDiscountForm from './admin/scenes/discounts/AddProdDiscountForm';
import EditProductForm from './admin/scenes/products/EditProductForm';
import AdminProductDetail from "./admin/scenes/products/AdminProductDetail";
import OrderHistoryPage from "./pages/order/OrderHistoryPage";
import CategoryRelatedProductsPage from "./admin/scenes/products/CategoryRelatedProducts";

function App() {
  return (
    <AuthContextProvider>
      <ToastContainer />
      <ProductContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Pages} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/product" exact component={ProductPage} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/category/:id" component={CategoryPage} />
            <Route path="/checkout" exact component={MakeOrderPage} />
            <Route path="/user" exact component={User} />
            <Route path="/order" component={OrderHistoryPage} />
            <Route path="/about" exact component={AboutUs} />
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin/categories" exact component={Categories} />
            <Route path="/admin/categories/add" component={AddCategoryForm} />
            <Route path="/admin/products" exact component={Products} />
            <Route path="/admin/products/add" component={AddProductForm} />
            <Route path="/admin/discounts/add" component={AddDiscountForm} />
            <Route path="/admin/discounts/view/:id" component={AppliedProducts} />
            <Route path="/admin/products/view/:id" component={AdminProductDetail} />
            <Route path="/admin/products/:id/edit" exact component={EditProductForm} />
            <Route path="/admin/orders" component={Orders} />
            <Route path="/admin/discounts" component={Discounts} />
            <Route path="/admin/product-discount/add" component={AddProdDiscountForm} />
            {/* <Route path="/admin/discounts/add" component={AddDiscountForm} /> */}
            <Route path="/admin/statistics" component={Statistics} />
            <Route path="/admin/team" component={Team} />
            <Route path="/admin/category/related-products" component={CategoryRelatedProductsPage} />
            <Route path="/admin/form" component={Form} />
            <Route path="/admin/bar" component={Bar} />
            <Route path="/admin/pie" component={Pie} />
            <Route path="/admin/line" component={Line} />
            <Route path="/admin/faq" component={FAQ} />
            <Route path="/admin/calendar" exact component={Pages} />
            <Route path="/admin/geography" component={Calendar} />
          </Switch>
        </Router>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}

export default App;
