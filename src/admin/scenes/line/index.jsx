import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import { AdminLayout } from "../../../layout/AdminLayout";

function Line() {
  return (
    <AdminLayout>
      <Box m="20px">
        <Header title="Line Chart" subtitle="Simple Line Chart" />
        <Box height="75vh">
          <LineChart />
        </Box>
      </Box>
    </AdminLayout>
  );
}

export default Line;
