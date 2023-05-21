import {
  Box, Button, IconButton, Typography, useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import StatBox from '../../components/StatBox';
import ProgressCircle from '../../components/ProgressCircle';
import { mockTransactions } from '../../data/mockData';
import { tokens } from '../../theme';
import { AdminLayout } from "../../../layout/AdminLayout";
import { APIRoutes } from '../../../constants/APIRoutes';

function DashboardComponent() {
  const [orders, setOrders] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const statsObj = {
    pendings: [],
    deliverings: [],
    completes: [],
    cancels: [],
    revenue: 0
  };
  let obj = {};
  if (localStorage.getItem("statsObj")) {
    obj = JSON.parse(localStorage.getItem("statsObj"));
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const fetchListOrder = async function (page = 0) {
    const response = await axios.post(`${APIRoutes.GET_ORDER_ADMIN}?page=${page}&size=${pageSize}`);
    const data = response.data.pageItems;
    data.forEach((item) => {
      switch (item.status) {
        case "PENDING":
          statsObj.pendings.push(item.status);
          break;
        case "DELIVERING":
          statsObj.deliverings.push(item.status);
          break;
        case "COMPLETE":
          statsObj.completes.push(item.status);
          statsObj.revenue += item.totalPrice;
          break;
        default:
          statsObj.cancels.push(item.status);
          break;
      }
    });
    if (response.status === 200) {
      localStorage.setItem("statsObj", JSON.stringify(statsObj));
    }
    setOrders(data);
  };

  useEffect(() => {
    fetchListOrder();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Trang Chủ" subtitle="Chào mừng tới Rose Secret" />
      </Box>

      {/* GRID & CHARTS */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
        {/* ROW 1 */}
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title={obj.pendings ? obj.pendings.length : 0}
            subtitle="Chưa Xác Nhận"
            progress="0.70"
            increase="+21%"
            icon={<ShoppingBagOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title={obj.deliverings ? obj.deliverings.length : 0}
            subtitle="Đang Giao Hàng"
            progress="0.30"
            increase="+5%"
            icon={<LocalShippingIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title={obj.completes ? obj.completes.length : 0}
            subtitle="Đã Giao Hàng"
            progress="0.80"
            increase="+43%"
            icon={<CheckIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title={obj.cancels ? obj.cancels.length : 0}
            subtitle="Đã Hủy"
            progress="0.80"
            increase="+43%"
            icon={<CancelIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title={obj.revenue ? obj.revenue.toLocaleString("vi", { style: "currency", currency: "VND" }) : 0}
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
