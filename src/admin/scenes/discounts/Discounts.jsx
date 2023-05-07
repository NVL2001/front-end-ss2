/* eslint-disable func-names */
/* eslint-disable eol-last */
import { React, useState, useEffect } from 'react';
import {
  Box, MenuItem, Select, Typography, useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { tokens } from '../../theme';
import { mockDataInvoices } from '../../data/mockData';
import Header from '../../components/Header';
import AddDiscountButton from './AddDiscountButton';
import { AdminLayout } from "../../../layout/AdminLayout";
import { getListDiscountAPI } from "../../API/DiscountAPI";

function DiscountsComponent() {
  const [discounts, setDiscounts] = useState([]);
  const fetchListDiscount = function () {
    getListDiscountAPI().then((response) => {
      setDiscounts(response);
    });
  };
  // Khai báo useEffect khi component được mount và mỗi khi State: listProduct thay đổi
  useEffect(() => {
    fetchListDiscount();
  }, []);
  console.log(discounts);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'code', headerName: 'Code Giảm Giá', flex: 1 },
    {
      field: 'description',
      headerName: 'Tên Chương Trình',
      flex: 1.5,
    },
    {
      field: 'discountPercent',
      headerName: '% Giảm Giá',
      flex: 0.5,
    },
    // {
    //   field: 'cost',
    //   headerName: 'Tổng Thanh Toán',
    //   renderCell: (params) => (
    //     <Typography color={colors.greenAccent[500]}>
    //       {params.row.cost}
    //       {' '}
    //       VNĐ
    //     </Typography>
    //   ),
    //   flex: 1,
    // },
    {
      field: 'startDate',
      headerName: 'Ngày Bắt Đầu',
      flex: 0.75,
    },
    {
      field: 'endDate',
      headerName: 'Ngày Kết Thúc',
      flex: 0.75,
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
            Thay Đổi Chương Trình
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Giảm Giá" subtitle="Chương Trình Giảm Giá" />
        <Box>
          <AddDiscountButton />
        </Box>
      </Box>
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
        <DataGrid
          rows={discounts}
          columns={columns}
          getRowId={(row) => row.code}
        />
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
