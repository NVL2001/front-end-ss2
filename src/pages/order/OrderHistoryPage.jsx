import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button, Modal, Pagination, Stack, styled, tableCellClasses, TextField
} from "@mui/material";
import { Link } from "react-router-dom";
import { setAxiosAuthorizeHeader } from "../../infra/http";
import { APIRoutes } from "../../constants/APIRoutes";
import { PublicLayout } from "../../layout/PublicLayout";
import formatMoney from "../../utils/formatMoney";
import formatDate from "../../utils/formatDate";

const BlackTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRowHeader = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
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

function Row(props) {
  const { row, reRender } = props;
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setHistoryModalOpen] = React.useState(false);
  const [modalCancel, setModalCancel] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [comment, setComment] = React.useState("");

  const handleModalOpen = (data) => {
    setHistory(data);
    setHistoryModalOpen(true);
  };

  const handleModalClose = () => {
    setHistoryModalOpen(false);
  };

  const cancelOrder = async (id, comment) => {
    const payload = {
      id,
      comment
    };

    axios.post(APIRoutes.CANCEL_ORDER, payload)
      .then((response) => {
        if (response.status === 200) {
          alert('Hủy đơn hàng thành công');
          reRender();
        }
      })
      .catch((error) => {
        alert('Hủy đơn hàng thất bại');
      });
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell width="10%" align="right">{row.id}</TableCell>
        <TableCell align="right">{formatMoney(row.totalPrice)}</TableCell>
        <TableCell align="right">{convertStatus(row.status)}</TableCell>
        <TableCell align="right">{row.createdDate}</TableCell>
        <TableCell align="center">
          <Button variant="contained" color="success" onClick={() => handleModalOpen(row.orderHistories)}>
            Xem lịch sử
          </Button>
          <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 700 }}>
              <OrderHistoryTable orderHistories={history} />
            </Box>
          </Modal>
          {(row.status === 'COMPLETE' || row.status === 'CANCEL' || row.status === 'DELIVERING') ? null : (
            <>
              <Button variant="outlined" color="error" onClick={() => setModalCancel(true)}>
                Hủy đơn hàng
              </Button>
              <Modal
                open={modalCancel}
                onClose={() => setModalCancel(false)}
              >
                <Box sx={{ ...style, width: 300 }}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Lí do hủy"
                    multiline
                    maxRows={4}
                    onChange={(event) => {
                      setComment(event.target.value);
                    }}
                  />
                  <Button variant="contained" onClick={() => cancelOrder(row.id, comment)}>
                    Xác nhận
                  </Button>
                </Box>
              </Modal>
            </>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Chi tiết đơn hàng
              </Typography>
              <b>
                <Typography variant="h8" component="div">
                  { `Địa chỉ giao hàng: ${row.address}, ${row.ward}, ${row.district}, ${row.province}` }
                </Typography>
                <Typography variant="h8" component="div">
                  { `Số điện thoại nhận hàng: ${row.phoneNumber}` }
                </Typography>
              </b>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Ảnh</TableCell>
                    <TableCell>Tên Sản Phẩm</TableCell>
                    <TableCell align="right">Số lượng đặt</TableCell>
                    <TableCell align="right">Trị giá</TableCell>
                    <TableCell align="right">Giảm giá</TableCell>
                    <TableCell align="right">Tổng</TableCell>
                    <TableCell align="right">Tên danh mục</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orderItems.map((item) => (
                    <TableRow key={item.product.id}>
                      <TableCell component="th" scope="row">
                        {item.product.productImages.length === 0 ? <img /> : <img src={`${axios.defaults.baseURL + item.product.productImages[0]}`} width={100} height={100} loading="lazy" />}
                      </TableCell>
                      <TableCell><Link to={`/product/${item.product.id}`}>{item.product.name}</Link></TableCell>
                      <TableCell align="right">{item.orderQuantity}</TableCell>
                      <TableCell align="right">
                        { item.product.discount ? <p style={{ textDecoration: "line-through" }}>{formatMoney(item.product.price)}</p> : formatMoney(item.product.price) }
                      </TableCell>
                      <TableCell align="right">
                        {item.product.discount ? formatMoney(item.product.discountPrice) : 'Không có giảm giá'}
                      </TableCell>
                      <TableCell align="right">
                        {
                          item.product.discount
                            ? formatMoney(item.product.discountPrice * item.orderQuantity)
                            : formatMoney(item.product.price * item.orderQuantity)
                        }
                      </TableCell>
                      <TableCell align="right">
                        { item.product.categoryName }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function OrderHistoryTable(props) {
  const { orderHistories } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Thời gian</TableCell>
            <TableCell>Thông tin</TableCell>
            <TableCell>Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderHistories.map((history) => (
            <TableRow key={history.date}>
              <TableCell>{formatDate(history.date)}
              </TableCell>
              <TableCell>{history.info}</TableCell>
              <TableCell>{convertStatus(history.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function CollapsibleTable() {
  const [orders, setOrders] = useState([]);
  const [change, onChange] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const reRender = () => {
    onChange(change + 1);
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(APIRoutes.GET_ORDERS, {
          params: {
            page
          }
        });
        setTotalPage(response.data.totalPages);
        setOrders(response.data.pageItems.map((order) => ({
          ...order,
          createdDate: formatDate(order.createdDate)
        })));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [change, page]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <StyledTableRowHeader>
            <BlackTableCell width="5%">Mở rộng</BlackTableCell>
            <BlackTableCell align="right">Mã đơn hàng</BlackTableCell>
            <BlackTableCell align="right">Tổng tiền</BlackTableCell>
            <BlackTableCell align="right">Trạng thái đơn hàng</BlackTableCell>
            <BlackTableCell align="right">Ngày tạo</BlackTableCell>
            <BlackTableCell align="center">Lựa chọn</BlackTableCell>
          </StyledTableRowHeader>
        </TableHead>
        <TableBody>
          {orders.map((item) => (
            <Row key={item.id} row={item} reRender={reRender} />
          ))}
        </TableBody>
      </Table>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        mt={2}
        mb={2}
      >

        <Pagination
          count={totalPage}
          page={page + 1}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </TableContainer>
  );
}

export default function OrderHistoryPage() {
  return (
    <PublicLayout>
      <CollapsibleTable />
    </PublicLayout>
  );
}
