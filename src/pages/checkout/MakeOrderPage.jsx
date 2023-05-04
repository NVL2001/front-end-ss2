import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../styles/theme";
import Head from "../../common/header/Head";
import Footer from "../../common/footer/Footer";
import MakeOrder from "./MakeOrder";

function MakeOrderPage() {
  return (
    <ThemeProvider theme={theme}>
      <Head />
      <MakeOrder />
      <Footer />
    </ThemeProvider>
  );
}
export default MakeOrderPage;
