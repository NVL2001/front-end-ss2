/* eslint-disable import/order */
import React from 'react';
import Button from '@mui/material/Button';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useHistory } from 'react-router-dom';
import axios from "axios";

function AddProductButton(props) {
  const { prodIds, cateId, callBack } = props;
  const history = useHistory();

  const handleAddProductClick = () => {
    history.push('/admin/products/add');
  };

  const removeProductsFromCategory = (pro, cat) => {
    const body = {
      productIds: pro,
      categoryId: cat
    };
    axios.post(`${axios.defaults.baseURL}/category/delete-products`, body)
      .then((res) => {
        if (res.status === 200) {
          alert("Xóa thành công");
        }
        callBack();
      }).catch((err) => alert("Xóa không thành công"));
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Button
      type="submit"
      sx={{
        backgroundColor: colors.redAccent[700],
        color: colors.redAccent[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        borderRadius: 0
      }}
      onClick={() => removeProductsFromCategory(prodIds, cateId)}
    >
      Xóa sản phẩm được chọn
    </Button>
  );
}

export default AddProductButton;
