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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { getListProductAPI, deleteProductAPI } from '../../API/ProductAPI';
import AddProductModal from './AddProductModal';

function Products() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const handleAddProductClick = () => {
    setIsAddingProduct(true);
  };
  const fetchListProduct = function () {
    getListProductAPI().then((response) => {
      setProducts(response);
    });
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
  }, []);

  const handleOpenDialog = (id) => {
    setIdToDelete(id);
    setIsDialogOpen(true);
  };

  // console.log(products);
  // console.log(products.pageItems);
  const row = Array.isArray(products.pageItems) ? products.pageItems : [];
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
        if (!Array.isArray(params.value)) {
          return <div>Giá trị không hợp lệ</div>;
        }
        return (
          <div>
            {params.value.slice(0, 1).map((image) => (
              <img
                key={image}
                src={`http://${image}`}
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
            <Button variant="contained" color="info">
              Xem
            </Button>
            <Button variant="contained" color="success">
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
  const rows = [
    // {
    //   id: 1,
    //   name: "ZO Skin Health Gentle Cleanser",
    //   quantity: 100,
    //   price: 1000000,
    //   discount: 900000,
    //   category: "Sữa Rửa Mặt",
    //   image:
    //     "https://zoskinhealth.com/dw/image/v2/BJWC_PRD/on/demandware.static/-/Sites-zoskinhealth-master/default/dwbfa94170/images/GENTLE%20CLEANSER/gencleans.full.plp.gbl.png?sw=816&q=65",
    // },
    // {
    //   id: 2,
    //   name: "ZO Skin Health Calming Toner",
    //   category: "Nước Hoa Hồng",
    //   quantity: 100,
    //   price: 1000000,
    //   discount: 900000,
    //   image:
    //     "https://zoskinhealth.com/dw/image/v2/BJWC_PRD/on/demandware.static/-/Sites-zoskinhealth-master/default/dwb43ac47a/images/CALMING%20TONER/calmtone.full.plp.gbl.png?sw=816&q=65",
    // },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Sản Phẩm" subtitle="Tất Cả Sản Phẩm" />
        <Box>
          <AddProductModal />
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
          rows={row}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}

export default Products;
