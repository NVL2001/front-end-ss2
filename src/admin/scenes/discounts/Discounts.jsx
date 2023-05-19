/* eslint-disable func-names */
/* eslint-disable eol-last */
import { React, useState, useEffect } from 'react';
import {
  Dialog, Box, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Typography, useTheme,
} from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { tokens } from '../../theme';
import { mockDataInvoices } from '../../data/mockData';
import Header from '../../components/Header';
import AddDiscountButton from './AddDiscountButton';
import { AdminLayout } from "../../../layout/AdminLayout";
import { getListDiscountAPI, updateDiscountAPI } from "../../API/DiscountAPI";
import formatDate from "../../../utils/formatDate";

function DiscountsComponent() {
  const history = useHistory();
  const [discounts, setDiscounts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [discountIdToEdit, setDiscountIdToEdit] = useState(null);
  const fetchListDiscount = function () {
    getListDiscountAPI().then((response) => {
      setDiscounts(response);
    });
  };
  // Khai báo useEffect khi component được mount và mỗi khi State: listProduct thay đổi
  useEffect(() => {
    fetchListDiscount();
  }, []);

  const handleOpenDialog = (code) => {
    setDiscountIdToEdit(code);
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const validationSchema = Yup.object({
    startDate: Yup.string().required('Ngày bắt đầu mới là bắt buộc'),
    endDate: Yup.string().required('Ngày kết thúc mới là bắt buộc'),
  });

  const columns = [
    { field: 'code', headerName: 'Code Giảm Giá', flex: 1 },
    // {
    //   field: 'description',
    //   headerName: 'Tên Chương Trình',
    //   flex: 1.5,
    // },
    {
      field: 'discountPercent',
      headerName: '% Giảm Giá',
      flex: 0.5,
    },
    {
      field: 'startDate',
      headerName: 'Ngày Bắt Đầu',
      flex: 0.75,
      renderCell: ({ row }) => (
        <Typography>{formatDate(row.startDate)}</Typography>
      )
    },
    {
      field: 'endDate',
      headerName: 'Ngày Kết Thúc',
      flex: 0.75,
      renderCell: ({ row }) => (
        <Typography>{formatDate(row.endDate)}</Typography>
      )
    },
    {
      field: 'discountStatus',
      headerName: 'Trạng thái',
      flex: 0.75,
      renderCell: ({ row }) => {
        const currentDate = new Date(); // Get the current date

        // Example start and end dates from the backend
        const startDate = new Date(row.startDate);
        const endDate = new Date(row.endDate);

        if (currentDate >= startDate && currentDate <= endDate) {
          return (
            <Typography style={{ color: 'green' }}>
              ACTIVE
            </Typography>
          );
        }
        return (
          <Typography style={{ color: 'red' }}>
            Expired
          </Typography>
        );
      }
    },
    {
      field: 'action',
      headerName: 'Hành Động',
      flex: 2.5,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="info" onClick={() => history.push(`/admin/discounts/view/${row?.code}`)}>
            Xem Chi Tiết
          </Button>
          <Button onClick={() => handleOpenDialog(row?.code)} variant="contained" color="success">
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

  const handleEditDiscountSubmit = async (values) => {
    const jsonBody = {
      id: discountIdToEdit,
      startDate: values.startDate,
      endDate: values.endDate
    };
    updateDiscountAPI(jsonBody);
    fetchListDiscount();
    handleCloseDialog();
  };

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
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          PaperProps={{
            elevation: 8,
            style: { backgroundColor: '#ffffff' },
          }}
        >
          <DialogTitle disableTypography>
            <Typography variant="h6" color="warning">
              THAY ĐỔI THÔNG TIN CHƯƠNG TRÌNH
            </Typography>
          </DialogTitle>
          <Formik
            initialValues={{ startDate: '', endDate: '' }}
            validationSchema={validationSchema}
            onSubmit={handleEditDiscountSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <DialogContent>
                  <Field
                    name="startDate"
                    type="text"
                    label="Ngày Bắt Đầu"
                    error={touched.startDate && errors.startDate}
                    helperText={touched.startDate && errors.startDate}
                  />

                </DialogContent>
                <DialogContent>
                  <Field
                    name="endDate"
                    type="text"
                    label="Ngày Kết Thúc"
                    error={touched.endDate && errors.endDate}
                    helperText={touched.endDate && errors.endDate}
                  />
                </DialogContent>

                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                    Hủy
                  </Button>
                  <Button type="submit" color="primary" autoFocus>
                    Lưu
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>
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
