import React, { useState } from 'react';
import { CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { ColorModeContext, useMode } from '../../admin/theme';
import Sidebar from "../../admin/scenes/global/Sidebar";
import Topbar from "../../admin/scenes/global/Topbar";
import { AuthContextProvider } from "../../context/AuthContext";
import "../../admin/css/Dashboard.css";

export function AdminLayout({ children }) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <AuthContextProvider>
        <ToastContainer />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Stack direction="row">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              {children}
            </main>
          </Stack>
        </ThemeProvider>
      </AuthContextProvider>
    </ColorModeContext.Provider>
  );
}
