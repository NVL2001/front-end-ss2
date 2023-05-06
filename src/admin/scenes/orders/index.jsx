/* eslint-disable eol-last */
import { React, useState, useEffect } from 'react';
import {
  Box, MenuItem, Select, Typography, useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios";
import { tokens } from '../../theme';
import { mockDataInvoices } from '../../data/mockData';
import Header from '../../components/Header';
import { AdminLayout } from "../../../layout/AdminLayout";
import { getListOrderAPI } from "../../API/OrderAPI";
import { APIRoutes } from "../../../constants/APIRoutes";
import formatDate from "../../../utils/formatDate";
import formatMoney from "../../../utils/formatMoney";

function OrdersComponent() {
  const [orders, setOrders] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const fetchListOrder = async function () {
    const response = await axios.post(APIRoutes.GET_ORDER_ADMIN);
    const data = response.data.pageItems;
    setOrders(data);
  };
  useEffect(() => {
    fetchListOrder();
  }, []);

  function convertStatus(status) {
    switch (status) {
      case "PENDING":
        return "Chờ xác nhận";
      case "DELIVERING":
        return <Box sx={{ color: 'info.main' }}>Đang Giao</Box>;
      case "CANCEL":
        return <Box sx={{ color: 'error.main' }}>Hủy</Box>;
      case "COMPLETE":
        return (
          <Box sx={{ color: 'success.main' }}>Hoàn Thành</Box>
        );
      default:
        return status;
    }
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'ID Đơn Hàng', flex: 1 },
    {
      field: 'totalPrice',
      headerName: 'Tổng Thanh Toán',
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {formatMoney(params.row.totalPrice)}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: 'createdDate',
      headerName: 'Ngày Tạo',
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {formatDate(params.row.createdDate)}
        </Typography>
      )
    },
    {
      field: 'status',
      headerName: 'Trạng Thái Đơn Hàng',
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {convertStatus(params.row.status)}
        </Typography>
      )
    },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      flex: 0.9,
    },
    {
      field: 'action',
      headerName: 'Hành Động',
      flex: 2.5,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="info">
            Xem Chi Tiết
          </Button>
          <Button variant="contained" color="success">
            Thay Đổi Trạng Thái
          </Button>
        </Stack>
      ),
    },
  ];
  const rows = [
    {
      id: 'orderid1',
      name: 'ZO Skin Health Calming Toner',
      category: 'Nước Hoa Hồng',
      quantity: 100,
      cost: 100000,
      date: '03/03/2023',
    },
  ];

  return (
    <Box m="20px">
      <Header title="Đơn Hàng" subtitle="Danh Sách Đơn Hàng" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={orders} columns={columns} />
      </Box>
    </Box>
  );
}

function Orders() {
  return (
    <AdminLayout>
      <OrdersComponent />
    </AdminLayout>
  );
}

export default Orders;
