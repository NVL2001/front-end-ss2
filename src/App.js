import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Header from './common/header/Header';
import Pages from './pages/Pages';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/productsDetail';
import User from './pages/User';
import Cart from './common/Cart/Cart';
import Footer from './common/footer/Footer';
import CategoryPage from './components/shops/CategoryPage';
import { ProductContextProvider } from './context/ProductContext';
import { theme } from './styles/theme';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <ProductContextProvider>
          <Router>
            {/* head */}
            <Header />
            {/* body */}
            <Switch>
              <Route path="/" exact>
                <Pages />
              </Route>

              <Route path="/cart" exact>
                <Cart />
              </Route>

              <Route path="/product" exact>
                <ProductPage />
              </Route>
              <Route path="/products/:id" component={ProductDetail} />

              <Route path="/category/:id" component={CategoryPage} />

              <Route path="/user" exact>
                <User />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </ProductContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
