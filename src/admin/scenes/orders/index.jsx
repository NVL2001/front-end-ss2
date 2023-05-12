/* eslint-disable eol-last */
import { React, useState, useEffect } from 'react';
import {
  Box, Dialog, DialogActions, DialogContent, DialogTitle,
  MenuItem, Modal, Select, TextField, Typography, useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { tokens } from '../../theme';

import Header from '../../components/Header';
import { AdminLayout } from "../../../layout/AdminLayout";
import {
  setOrderDeliveringAPI, cancelOrderByAdminAPI, setOrderCompleteAPI
} from "../../API/OrderAPI";
import { APIRoutes } from "../../../constants/APIRoutes";
import formatDate from "../../../utils/formatDate";
import formatMoney from "../../../utils/formatMoney";
import OrderDetail from "./OrderDetail";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function OrdersComponent() {
  const [orders, setOrders] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [idToDelete, setIdToDelete] = useState(null);
  const [isStatusSaved, setIsStatusSaved] = useState(false);
  const [statusIdToEdit, setStatusIdToEdit] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [comment, setComment] = useState("");

  const fetchListOrder = async function (page = 0) {
    const response = await axios.post(`${APIRoutes.GET_ORDER_ADMIN}?page=${page}&size=${pageSize}`);
    const data = response.data.pageItems;
    setOrders(data);
    setTotalRows(response.data.totalItems);
  };

  const handlePageSizeChange = (pageSize) => {
    setPageSize(pageSize);
  };

  useEffect(() => {
    fetchListOrder();
  }, [isStatusSaved, pageSize]);
  const handleOpenDialog = (id, status) => {
    setStatusIdToEdit(id);
    setSelectedStatus(status);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  // console.log("status", statusIdToEdit);

  const handleStatusChange = (event) => {
    const status = event.target.value;
    switch (status) {
      case "DELIVERING":
        return setSelectedStatus(status);
      case "CANCEL":
        return setSelectedStatus(status);
      case "COMPLETE":
        return setSelectedStatus(status);
      default:
        setSelectedStatus("");
        return status;
    }
  };

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

  const handleSaveStatus = async () => {
    const jsonBody = {
      id: statusIdToEdit,
      comment
    };
    try {
      switch (selectedStatus) {
        case "DELIVERING":
          await setOrderDeliveringAPI(jsonBody);
          break;
        case "CANCEL":
          await cancelOrderByAdminAPI(jsonBody);
          break;
        case "COMPLETE":
          await setOrderCompleteAPI(jsonBody);
          break;
        default:
          break;
      }
      setIsStatusSaved(true);
      handleCloseDialog();
      setIsStatusSaved(false);
      alert("Thay đổi trạng thái thành công!");
    } catch (err) {
      alert("Thay đổi trạng thái thất bại!");
    }
  };

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
      renderCell: ({ row }) => {
        const [open, setOpen] = useState(false); // Separate open state for each modal

        const handleOpen = () => {
          setOpen(true); // Open the specific modal
        };

        const handleClose = () => {
          setOpen(false); // Close the specific modal
        };

        return (
          <Stack direction="row" spacing={1}>
            <Button variant="contained" color="info" onClick={handleOpen}>
              Xem Chi Tiết
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <OrderDetail order={row} />

              </Box>
            </Modal>
            <Button variant="contained" onClick={() => handleOpenDialog(row?.id, row?.status)} color="success">
              Thay Đổi Trạng Thái
            </Button>
          </Stack>
        );
      },
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
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          PaperProps={{
            elevation: 8,
            style: {
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? colors.primary[500] : colors.grey)
            },
          }}
        >
          <DialogTitle disableTypography>
            <Typography variant="h6" color="warning">
              THAY ĐỔI TRẠNG THÁI
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Box display="flex" flexDirection="column">
              <Select
                value={selectedStatus}
                onChange={(status) => handleStatusChange(status)}
                fullWidth
                variant="outlined"
                label="Trạng thái"
              >
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="DELIVERING">Delivering</MenuItem>
                <MenuItem value="COMPLETE">Complete</MenuItem>
                <MenuItem value="CANCEL">Cancel</MenuItem>
              </Select>
              <TextField
                id="outlined-multiline-flexible"
                label="Thêm thông tin"
                multiline
                maxRows={4}
                sx={
                  {
                    marginTop: 1,
                  }
                }
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              <Typography variant="button" style={{ color: 'white' }}>
                HỦY
              </Typography>
            </Button>
            <Button onClick={handleSaveStatus} color="success" autoFocus>
              <Typography variant="button" color="info">
                LƯU
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
        <DataGrid
          rows={orders}
          columns={columns}
          rowCount={totalRows}
          pageSize={pageSize}
          paginationMode="server"
          onPageSizeChange={(pageSize) => {
            handlePageSizeChange(pageSize);
          }}
          rowsPerPageOptions={[10, 30, 50]}
          onPageChange={(page, details) => {
            fetchListOrder(page);
          }}
        />
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
