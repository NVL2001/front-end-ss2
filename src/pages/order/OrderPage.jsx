import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../styles/theme";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import Order from "./Order";

function OrderPage() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Order />
      <Footer />
    </ThemeProvider>
  );
}
export default OrderPage;
