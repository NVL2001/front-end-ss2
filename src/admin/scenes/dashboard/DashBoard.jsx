import {
  Box, Button, IconButton, Typography, useTheme,
} from '@mui/material';
import React from 'react';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import StatBox from '../../components/StatBox';
import ProgressCircle from '../../components/ProgressCircle';
import { mockTransactions } from '../../data/mockData';
import { tokens } from '../../theme';
import { AdminLayout } from "../../../layout/AdminLayout";

function DashboardComponent() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Trang Chủ" subtitle="Chào mừng tới Cosmetics Shop" />
      </Box>

      {/* GRID & CHARTS */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
        {/* ROW 1 */}
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="150"
            subtitle="Chưa Xác Nhận"
            progress="0.70"
            increase="+21%"
            icon={<ShoppingBagOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="431,225"
            subtitle="Đang Chuẩn Bị Hàng"
            progress="0.50"
            increase="+21%"
            icon={<InventoryIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="32,441"
            subtitle="Đang Giao Hàng"
            progress="0.30"
            increase="+5%"
            icon={<LocalShippingIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="1,325,134"
            subtitle="Đã Giao Hàng"
            progress="0.80"
            increase="+43%"
            icon={<CheckIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="1,325,134"
            subtitle="Đã Hủy"
            progress="0.80"
            increase="+43%"
            icon={<CancelIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="1,325,134"
            subtitle="Doanh Thu"
            progress="0.80"
            increase="+43%"
            icon={<AttachMoneyIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>

        {/* ROW 2 */}
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return (
    <AdminLayout>
      <DashboardComponent />
    </AdminLayout>
  );
}
