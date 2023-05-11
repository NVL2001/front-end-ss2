/* eslint-disable func-names */
/* eslint-disable eol-last */
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
import axios from "axios";
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import StatBox from '../../components/StatBox';
import ProgressCircle from '../../components/ProgressCircle';
import { mockTransactions } from '../../data/mockData';
import { tokens } from '../../theme';
import { AdminLayout } from "../../../layout/AdminLayout";
import formatMoney from "../../../utils/formatMoney";

function DiscountsComponent() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState({});

  async function fetchStatistics() {
    const currDate = new Date();
    const day = currDate.getDate();
    const month = currDate.getMonth() + 1;
    const year = currDate.getFullYear();
    const dayStat = (await axios.get(`${axios.defaults.baseURL}/revenue?day=${day}&month=${month}&year=${year}`)).data;
    const monthStat = (await axios.get(`${axios.defaults.baseURL}/revenue?month=${month}&year=${year}`)).data;
    const yearStat = (await axios.get(`${axios.defaults.baseURL}/revenue?year=${year}`)).data;
    const result = {
      ...data,
      dayStat,
      monthStat,
      yearStat
    };
    return result;
  }

  useEffect(() => {
    fetchStatistics().then((r) => setData(r));
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Thống Kê" subtitle="Chi Tiết Doanh Thu" />
      </Box>

      {/* GRID & CHARTS */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
        {/* ROW 1 */}
        <Box gridColumn="span 4" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title={formatMoney(data.dayStat)}
            subtitle="Doanh Thu Ngày"
            icon={<AttachMoneyIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box gridColumn="span 4" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title={formatMoney(data.monthStat)}
            subtitle="Doanh Thu Tháng"
            icon={<AttachMoneyIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box gridColumn="span 4" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title={formatMoney(data.yearStat)}
            subtitle="Doanh Thu Năm"
            icon={<AttachMoneyIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>

        {/* ROW 2 */}
      </Box>
    </Box>
  );
}

function Discounts() {
  return (
    <AdminLayout>
      <DiscountsComponent />
    </AdminLayout>
  );
}

export default Discounts;
