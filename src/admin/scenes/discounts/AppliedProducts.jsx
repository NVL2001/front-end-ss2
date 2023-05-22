/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable eol-last */
import { React, useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Dialog, Box, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Typography, useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { tokens } from '../../theme';
import { mockDataInvoices } from '../../data/mockData';
import Header from '../../components/Header';
import { AdminLayout } from "../../../layout/AdminLayout";
import { deleteDiscountProductAPI, getAppliedProductsAPI, updateDiscountAPI } from "../../API/DiscountAPI";

import formatMoney from "../../../utils/formatMoney";
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import AddProdDiscountBtn from "./AddProdDiscountBtn";

function AppliedProducts() {
  const history = useHistory();
  const [discounts, setDiscounts] = useState([]);
  const discountCode = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [discountIdToEdit, setDiscountIdToEdit] = useState(null);
  const [delProduct, setDelProduct] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectionModelChange = (selection) => {
    setSelectedIds(selection);
  };

  const fetchProdDiscount = function () {
    getAppliedProductsAPI(discountCode.id).then((response) => {
      setDiscounts(response);
    });
  };
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
    { field: 'id', headerName: 'ID Sản Phẩm', flex: 0.8 },
    {
      field: 'name',
      headerName: 'Tên Sản Phẩm',
      flex: 5,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'price',
      headerName: 'Giá gốc',
      flex: 1,
      renderCell: ({ row }) => <Typography>{formatMoney(row.price)}</Typography>
    },
    {
      field: 'discountPrice',
      headerName: 'Giảm giá',
      flex: 1,
      renderCell: ({ row }) => <Typography>{formatMoney(row.discountPrice)}</Typography>
    },
    {
      field: 'action',
      headerName: 'Hành Động',
      flex: 1.5,
      renderCell: ({ row }) => {
        const { access } = row || {};

        return (
          <Stack direction="row" spacing={2}>
            <Link to={`/admin/products/view/${row?.id}`}>
              <Button variant="contained" color="info">
                Xem
              </Button>
            </Link>
          </Stack>
        );
      },
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
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <AddProdDiscountBtn productIds={selectedIds} discountCode={discountCode} callBackFun={fetchProdDiscount} />
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
          selectionModel={selectedIds}
          pageSize={discounts.length}
          onSelectionModelChange={handleSelectionModelChange}
          checkboxSelection
          disableRowSelectionOnClick
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
