/* eslint-disable no-nested-ternary */
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Header from '../../components/Header';
import { mockDataTeam } from '../../data/mockData';
import { tokens } from '../../theme';
import { AdminLayout } from "../../../layout/AdminLayout";

function TeamComponent() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'Tên Đăng Nhập' },
    {
      field: 'name',
      headerName: 'Tên Nhân Viên',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'accessLevel',
      headerName: ' Loại Tài Khoản',
      flex: 1,
      renderCell: ({ row: { access } }) => (
        <Box
          width="60%"
            // m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          alignItems="left"
          backgroundColor={
              access === 'admin'
                ? colors.greenAccent[600]
                : access === 'manager'
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
          borderRadius="4px"
        >
          {access === 'admin' && <AdminPanelSettingsOutlinedIcon />}
          {access === 'manager' && <SecurityOutlinedIcon />}
          {access === 'user' && <LockOpenOutlinedIcon />}
          <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
            {access}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'action',
      headerName: 'Hành Động',
      flex: 1.5,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success">
            Chỉnh Sửa Quyền
          </Button>
          <Button variant="outlined" color="error">
            Xóa Tài Khoản
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Quản Lý Tài Khoản" subtitle="Quản Lý Vai Trò" />
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
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
}

function Team() {
  return (
    <AdminLayout>
      <TeamComponent />
    </AdminLayout>
  );
}

export default Team;
