import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, useTheme, Box } from '@mui/material';
import { tokens } from '../../theme';

function AddProductButton(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Gọi lại các props từ bên trên truyền xuống
  const { onHandleAddButton } = props;
  // Hàm xử lý khi click vào nút Thêm Sản Phẩm
  const handleCreateNewProduct = () => {
    onHandleAddButton();
  };
  //
  return (
    <Button
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: '14px',
        fontWeight: 'bold',
        padding: '10px 20px',
      }}
    >
      <AddIcon sx={{ mr: '10px' }} onClick={handleCreateNewProduct} />
      Thêm Sản Phẩm
    </Button>
  );
}

export default AddProductButton;
