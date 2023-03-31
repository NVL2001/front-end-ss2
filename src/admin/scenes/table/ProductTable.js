import React, { useEffect } from 'react'
import Products from '../products/Products'
import { Stack } from '@mui/material/Stack';
import { Button } from 'antd';
import { useState } from 'react';
      const columns = [
    { field: "id", headerName: "ID Sản Phẩm", flex: 0.5 },
    {
      field: "name",
      headerName: "Tên Sản Phẩm",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "image",
      headerName: "Hình Ảnh",
      width: 120,
      editable: false,
      renderCell: (params) => <img src={params.value} alt="123" width={100} height="auto" />,
    },
    {
      field: "quantity",
      headerName: "Số Lượng",
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Giá Gốc",
      flex: 1,
    },
    {
      field: "discount",
      headerName: "Giá Giảm",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Danh Mục",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Hành Động",
      flex: 3,
      renderCell: ({ row: { access } }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button color="info">Xem</Button>
      <Button variant="contained" color="success">
        Chỉnh Sửa
      </Button>
      <Button variant="outlined" color="error">
        Xóa
      </Button>
    </Stack>
  );
}
}

  ];
  
    const ProductTable = () => {
        const [products, setProducts] = useState([]);
    
      useEffect(() => {
        fetch('http://localhost:8080/api/v1/products/1') 
          
        {
          method: "GET";
            headers: {
              accept: "application/json",
                "Content-Type": "application/json",
                "Access - Control - Allow - Origin": "*";
          };
  }
        
      }, []);
    return (
        <Products
            rows={products}
            columns={columns}
        />
  );
};

export default ProductTable