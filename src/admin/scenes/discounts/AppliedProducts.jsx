/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable eol-last */
import { React, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Dialog, Box, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Typography, useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { tokens } from '../../theme';
import { mockDataInvoices } from '../../data/mockData';
import Header from '../../components/Header';
import { AdminLayout } from "../../../layout/AdminLayout";
import { deleteDiscountProductAPI, getAppliedProductsAPI, updateDiscountAPI } from "../../API/DiscountAPI";
import AddProdDiscountBtn from './AddProdDiscountBtn';

function AppliedProducts() {
  const history = useHistory();
  const [discounts, setDiscounts] = useState([]);
  const discountCode = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [discountIdToEdit, setDiscountIdToEdit] = useState(null);
  const [delProduct, setDelProduct] = useState(null);
  const fetchProdDiscount = function () {
    getAppliedProductsAPI(discountCode.id).then((response) => {
      setDiscounts(response);
    });
  };
  console.log("discountCode", discountCode.id);
  // Khai báo useEffect khi component được mount và mỗi khi State: listProduct thay đổi
  useEffect(() => {
    fetchProdDiscount();
  }, []);

  const handleOpenDialog = (id) => {
    setDelProduct(id);
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteProdDiscount = async () => {
    await deleteDiscountProductAPI(delProduct, discountCode.id);
    fetchProdDiscount();
  };

  const handleConfirmDelete = () => {
    handleDeleteProdDiscount();
    handleCloseDialog();
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const validationSchema = Yup.object({
    startDate: Yup.string().required('Ngày bắt đầu mới là bắt buộc'),
    endDate: Yup.string().required('Ngày kết thúc mới là bắt buộc'),
  });

  const columns = [
    { field: 'id', headerName: 'ID sản phẩm', flex: 1 },
    {
      field: 'name',
      headerName: 'Tên sản phẩm',
      flex: 1.5,
    },
    // {
    //   field: 'discountPercent',
    //   headerName: '% Giảm Giá',
    //   flex: 0.5,
    // },
    // {
    //   field: 'startDate',
    //   headerName: 'Ngày Bắt Đầu',
    //   flex: 0.75,
    // },
    // {
    //   field: 'endDate',
    //   headerName: 'Ngày Kết Thúc',
    //   flex: 0.75,
    // },
    {
      field: 'action',
      headerName: 'Hành Động',
      flex: 2.5,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          {/* <Button variant="contained" color="info" onClick={() => history.push(`/admin/discounts/view/${row?.id}`)}>
            Xem Chi Tiết
          </Button> */}
          <Button onClick={() => handleOpenDialog(row?.id)} variant="contained" color="error">
            Xóa sản phẩm
          </Button>
        </Stack>
      ),
    },
  ];

  const handleEditDiscountSubmit = async (values) => {
    const jsonBody = {
      id: discountIdToEdit,
      startDate: values.startDate,
      endDate: values.endDate
    };
    updateDiscountAPI(jsonBody);
    fetchProdDiscount();
    handleCloseDialog();
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Mã Chương Trình" subtitle="Sản Phẩm Chương Trình Giảm Giá" />
        <Box>
          <AddProdDiscountBtn />
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
          }

        }}
      >
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          PaperProps={{
            elevation: 8,
            style: { backgroundColor: colors.primary[500] },
          }}
        >
          <DialogTitle disableTypography>
            <Typography variant="h6" color="error">
              XÁC NHẬN XÓA DANH MỤC
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1">
              Bạn có chắc chắn muốn xóa sản phẩm này không?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              <Typography variant="button" style={{ color: 'white' }}>
                HỦY
              </Typography>
            </Button>
            <Button onClick={handleConfirmDelete} color="primary" autoFocus>
              <Typography variant="button" color="error">
                XÓA
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
        <DataGrid
          rows={discounts}
          columns={columns}
          getRowId={(row) => row.id}
        />
      </Box>
    </Box>
  );
}

function Discounts() {
  return (
    <AdminLayout>
      <AppliedProducts />
    </AdminLayout>
  );
}

export default Discounts;
