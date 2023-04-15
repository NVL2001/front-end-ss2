import React from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../styles/theme';
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";

export function PublicLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
