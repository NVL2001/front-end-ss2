import { React, useState } from 'react';
import { Routes, Route, Switch } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard/DashBoard';
import Team from './scenes/team/Team';
// import Invoices from './scenes/orders';
import Bar from './scenes/bar';
import Form from './scenes/form';
import Line from './scenes/line';
import Pie from './scenes/pie';
import FAQ from './scenes/faq';
import { ColorModeContext, useMode } from './theme';
import Calendar from './scenes/calendar/calendar';
import Products from './scenes/products/Products';
import Categories from './scenes/categories/Categories';
import Orders from './scenes/orders/index';
import InputProduct from './scenes/products/InputProduct';

function AdminRoutes() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Switch>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/categories" element={<Categories />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/products/add" element={<InputProduct />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/team" element={<Team />} />
              <Route path="/admin/form" element={<Form />} />
              <Route path="/admin/bar" element={<Bar />} />
              <Route path="/admin/pie" element={<Pie />} />
              <Route path="/admin/line" element={<Line />} />
              <Route path="/admin/faq" element={<FAQ />} />
              <Route path="/admin/calendar" element={<Calendar />} />
              <Route path="/admin/geography" element={<Calendar />} />
            </Switch>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default AdminRoutes;
