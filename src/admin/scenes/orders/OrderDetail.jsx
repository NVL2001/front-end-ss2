import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import formatMoney from "../../../utils/formatMoney";
import { tokens } from "../../theme";
import formatDate from "../../../utils/formatDate";

function OrderDetail(props) {
  const { order } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <Typography>{`Số điện thoại nhận hàng: ${order.phoneNumber}`}</Typography>
        <Typography variant="h8" component="div">
          { `Địa chỉ giao hàng: ${order.address}, ${order.ward}, ${order.district}, ${order.province}` }
        </Typography>
        <Typography>
          {`Tổng thanh toán: ${formatMoney(order.totalPrice)}`}
        </Typography>
        <Typography>
          <b>
            {`Họ tên người nhận: ${order.realName}`}
          </b>
        </Typography>
        <Typography>
          {`Thời gian tạo: ${formatDate(order.createdDate)}`}
        </Typography>
      </Box>
      <Box>
        <TableContainer
          size="small"
          aria-label="purchases"
          style={{ maxHeight: 600 }}
          sx={{
            marginTop: 2
          }}
        >
          <Table stickyHeader>
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
              {order.orderItems.map((item) => (
                <TableRow key={item.product.id}>
                  <TableCell component="th" scope="row">
                    {item.product.productImages.length === 0 ? <img /> : <img src={`${axios.defaults.baseURL + item.product.productImages[0]}`} width={100} height={100} loading="lazy" />}
                  </TableCell>
                  <TableCell>
                    <Link to={`/product/${item.product.id}`}>
                      <Typography color={colors.greenAccent[500]}>
                        {item.product.name}
                      </Typography>
                    </Link>
                  </TableCell>
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
        </TableContainer>
      </Box>
    </Box>
  );
}

export default OrderDetail;
