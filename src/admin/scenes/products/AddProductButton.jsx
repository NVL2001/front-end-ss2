/* eslint-disable import/order */
import React from 'react';
import Button from '@mui/material/Button';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useHistory } from 'react-router-dom';

function AddProductButton() {
  const history = useHistory();

  const handleAddProductClick = () => {
    history.push('/admin/products/add');
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Button
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        borderRadius: 0
      }}
      onClick={handleAddProductClick}
    >
      Thêm sản phẩm
    </Button>
  );
}

export default AddProductButton;
