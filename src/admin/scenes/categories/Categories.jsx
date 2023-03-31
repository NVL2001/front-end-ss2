import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
// import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
// import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { React, useState, useEffect } from 'react';
import { getListCategoryAPI } from '../../API/CategoryAPI';
import Header from '../../components/Header';
import { mockDataTeam } from '../../data/mockData';
import { tokens } from '../../theme';

function Categories() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [categories, setCategories] = useState([]);
  const fetchListProduct = function () {
    getListCategoryAPI().then((response) => {
      setCategories(response);
    });
  };
  // Khai báo useEffect khi component được mount và mỗi khi State: listProduct thay đổi
  useEffect(() => {
    fetchListProduct();
  }, []);
  console.log(categories);
  const columns = [
    { field: 'id', headerName: 'ID Danh Mục', flex: 1 },
    {
      field: 'name',
      headerName: 'Tên Danh Mục',
      flex: 1.5,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'action',
      headerName: 'Hành Động',
      flex: 1,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success">
            Chỉnh Sửa
          </Button>
          <Button variant="contained" color="error">
            Xóa
          </Button>
        </Stack>
      ),
    },
  ];
  const rows = [
    {
      id: 'srm',
      name: 'Sữa Rửa Mặt',
    },
    {
      id: 'nhh',
      name: 'Nước Hoa Hồng',
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Danh Mục" subtitle="Tất Cả Danh Mục" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            <AddIcon sx={{ mr: '10px' }} />
            Thêm Danh Mục
          </Button>
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
        <DataGrid rows={categories} columns={columns} />
      </Box>
    </Box>
  );
}

export default Categories;
