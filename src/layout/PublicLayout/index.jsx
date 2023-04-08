import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../styles/theme';
import { AuthContextProvider } from '../../context/AuthContext';
import { ProductContextProvider } from '../../context/ProductContext';
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";

export function PublicLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <AuthContextProvider>
        <ProductContextProvider>
          <Header />
          {children}
          <Footer />
        </ProductContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
