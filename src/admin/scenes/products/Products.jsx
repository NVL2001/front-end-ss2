/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import { React, useEffect, useState } from 'react';
import {
  Box,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { getListProductAPI, deleteProductAPI, getProductByIdAPI } from '../../API/ProductAPI';
import AddProductButton from './AddProductButton';
import { AdminLayout } from "../../../layout/AdminLayout";
import { APIRoutes } from "../../../constants/APIRoutes";

function ProductsComponent() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const history = useHistory();

  const handlePageSizeChange = (pageSize) => {
    setPageSize(pageSize);
  };

  const handleEditProductClick = (id) => {
    getProductByIdAPI(id).then((response) => {
      window.localStorage.setItem("editProduct", JSON.stringify(response));
      // window.localStorage.setItem("editProduct", response);
      if (response) {
        history.push(`/admin/products/${id}/edit`);
      }
    });
  };

  const handleAddProductClick = () => {
    setIsAddingProduct(true);
  };
  const fetchListProduct = async function (page = 0) {
    const response = (await axios.get(`${APIRoutes.GET_PRODUCTS}?page=${page}&size=${pageSize}`)).data;
    setData(response.pageItems);
    setTotalRows(response.totalItems);
    setPage(page);
    setPageSize(pageSize);
  };

  const handleDeleteProduct = async () => {
    await deleteProductAPI(idToDelete);
    fetchListProduct();
  };

  const handleConfirmDelete = () => {
    handleDeleteProduct();
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    fetchListProduct();
  }, [pageSize]);

  const handleOpenDialog = (id) => {
    setIdToDelete(id);
    setIsDialogOpen(true);
  };

  const columns = [
    { field: 'id', headerName: 'ID Sản Phẩm', flex: 1 },
    {
      field: 'name',
      headerName: 'Tên Sản Phẩm',
      flex: 2,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'productImages',
      headerName: 'Hình Ảnh',
      width: 120,
      editable: false,
      renderCell: (params) => {
        // Kiểm tra nếu giá trị của ô hiện tại không phải là một mảng, render ra một thông báo lỗi
        if (!Array.isArray(params.value)) {
          return <div>Giá trị không hợp lệ</div>;
        }
        // Nếu giá trị của ô hiện tại là một mảng, hiển thị hình ảnh đầu tiên trong mảng
        return (
          <div>
            {params.value.slice(0, 1).map((image) => (
              <img
                key={image}
                src={`${axios.defaults.baseURL}${image}`}
                alt="123"
                width={100}
                height="auto"
              />
            ))}
          </div>
        );
      },
    },
    {
      field: 'quantity',
      headerName: 'Số Lượng',
      flex: 0.5,
    },
    {
      field: 'price',
      headerName: 'Giá Gốc',
      flex: 1,
    },
    {
      field: 'categoryName',
      headerName: 'Danh Mục',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Hành Động',
      flex: 2.5,
      renderCell: ({ row }) => {
        const { access } = row || {};

        return (
          <Stack direction="row" spacing={2}>
            <Link to={`/admin/products/view/${row?.id}`}>
              <Button variant="contained" color="info">
                Xem
              </Button>
            </Link>
            <Button variant="contained" color="success" onClick={() => handleEditProductClick(row?.id)}>
              Chỉnh Sửa
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleOpenDialog(row?.id)}
            >
              Xóa
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Sản Phẩm" subtitle="Tất Cả Sản Phẩm" />
        <Box>
          <AddProductButton />
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
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },

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
              XÁC NHẬN XÓA SẢN PHẨM
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
          rowHeight={110}
          rows={data}
          rowCount={totalRows}
          pageSize={pageSize}
          columns={columns}
          paginationMode="server"
          rowsPerPageOptions={[10, 30, 50]}
          onPageSizeChange={(pageSize) => {
            handlePageSizeChange(pageSize);
          }}
          onPageChange={(page, details) => {
            fetchListProduct(page);
          }}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}

function Products() {
  return (
    <AdminLayout>
      <ProductsComponent />
    </AdminLayout>
  );
}

export default Products;
