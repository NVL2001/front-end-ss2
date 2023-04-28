import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import BarChart from '../../components/BarChart';
import { AdminLayout } from "../../../layout/AdminLayout";

function Bar() {
  return (
    <AdminLayout>
      <Box m="20px">
        <Header title="Bar Chart" subtitle="Simple Bar Chart" />
        <Box height="75vh">
          <BarChart />
        </Box>
      </Box>
    </AdminLayout>
  );
}

export default Bar;
