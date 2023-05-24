/* eslint-disable import/order */
import React from 'react';
import Button from '@mui/material/Button';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useHistory } from 'react-router-dom';
import axios from "axios";

function AddProdDiscountBtn(props) {
  const history = useHistory();
  const { callBackFun, productIds, discountCode } = props;

  const handleAddProdDiscountClick = () => {
    history.push('/admin/product-discount/add', {
      id: discountCode.id
    });
  };

  function removeDiscountFromProduct(proId) {
    const body = {
      discountCode: discountCode.id,
      productIds
    };
    axios.post(`${axios.defaults.baseURL}/discount/remove-applied-prouducts`, body)
      .then((r) => {
        alert("Xóa thành công");
        callBackFun();
      }).catch((err) => alert(err.response.data));
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Button
        sx={{
          backgroundColor: colors.redAccent[700],
          color: colors.redAccent[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
          borderRadius: 0
        }}
        onClick={() => removeDiscountFromProduct(productIds)}
      >
        Xóa sản phẩm được chọn
      </Button>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
          borderRadius: 0
        }}
        onClick={handleAddProdDiscountClick}
      >
        Thêm sản phẩm vào chương trình
      </Button>
    </>
  );
}

export default AddProdDiscountBtn;
