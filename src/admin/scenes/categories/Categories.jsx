/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-use-before-define */
import {
  Box, Typography, useTheme, Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
// import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
// import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import { React, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { getListCategoryAPI, deleteCategoryAPI } from '../../API/CategoryAPI';
import Header from '../../components/Header';
import { mockDataTeam } from '../../data/mockData';
import { tokens } from '../../theme';
import AddCategoryButton from './AddCategoryButton';
import { AdminLayout } from "../../../layout/AdminLayout";
import EditCategoryDialog from './EditCategoryForm';

function CategoriesComponent() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nameToDelete, setNameToDelete] = useState(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleAddCategoryClick = () => {
    setIsAddingCategory(true);
  };
  const fetchListCategory = function () {
    getListCategoryAPI().then((response) => {
      setCategories(response);
    });
  };

  const handleDeleteCategory = async () => {
    toast.success(`Danh mục '${nameToDelete}' đã bị xóa!`);
    await deleteCategoryAPI(nameToDelete);
    fetchListCategory();
  };

  const handleConfirmDelete = () => {
    handleDeleteCategory();
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOpenDialog = (name) => {
    setNameToDelete(name);
    setIsDialogOpen(true);
  };
  // Khai báo useEffect khi component được mount và mỗi khi State: listCategory thay đổi
  useEffect(() => {
    fetchListCategory();
  }, []);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [categoryIdToEdit, setCategoryIdToEdit] = useState(null);

  const handleEditCategoryClick = (id) => {
    setCategoryIdToEdit(id);
    setIsEditDialogOpen(true);
  };
  const columns = [
    { field: 'id', headerName: 'ID Danh Mục', flex: 1 },
    {
      field: 'name',
      headerName: 'Tên Danh Mục',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'action',
      headerName: 'Hành Động',
      flex: 1,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              history.push({
                pathname: "/admin/category/related-products",
                state: { categoryName: row.name, categoryId: row.id }
              });
            }}
          >
            Sản phẩm liên quan
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleEditCategoryClick(row?.id)}
          >
            Sửa tên
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOpenDialog(row?.name)}
            style={{
              color: theme.palette.mode === 'dark' ? 'black' : 'white',
            }}
          >
            Xóa
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Danh Mục" subtitle="Tất Cả Danh Mục" />
        <Box>
          <AddCategoryButton />
          <EditCategoryDialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            id={categoryIdToEdit}
            fetchListCategory={fetchListCategory}
          />

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
            style: { background: colors.primary[400] },
          }}
        >
          <DialogTitle disableTypography>
            <Typography variant="h6" color="error">
              XÁC NHẬN XÓA DANH MỤC
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1">
              Bạn có chắc chắn muốn xóa danh mục này không?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              <Typography variant="button" style={{ color: colors.grey[400] }}>
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
          rows={categories}
          columns={columns}
          pageSize={categories.length} // Set the pageSize to the total number of rows
          rowsPerPageOptions={[categories.length]}
        />
      </Box>
    </Box>
  );
}

function Categories() {
  return (
    <AdminLayout>
      <CategoriesComponent />
    </AdminLayout>
  );
}

export default Categories;
