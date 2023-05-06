/* eslint-disable import/order */
import React from 'react';
import Button from '@mui/material/Button';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { withRouter } from 'react-router-dom';

function AddCategoryButton(props) {
  const handleAddCategoryClick = () => {
    props.history.push('/admin/categories/add');
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
      onClick={handleAddCategoryClick}
    >
      Thêm danh mục
    </Button>
  );
}

export default withRouter(AddCategoryButton);
