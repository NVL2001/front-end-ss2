import React from 'react';
import {
  Box, Typography, useTheme, Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { tokens } from '../../theme';
import { updateCategoryAPI } from '../../API/CategoryAPI';

function EditCategoryDialog({
  isOpen, onClose, id, fetchListCategory
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const validationSchema = Yup.object({
    newName: Yup.string().required('Tên danh mục mới là bắt buộc'),
  });

  // const handleEditCategorySubmit = async (values) => {
  //   const requestOptions = {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //     body: JSON.stringify({ id, newName: values.newName }),
  //   };
  //   const response = await fetch('http://localhost:8080/api/category/update-category', requestOptions);
  //   if (response.ok) {
  //     fetchListCategory();
  //     onClose();
  //   }
  // };
  const handleEditCategorySubmit = async (values) => {
    console.log("values", id);
    updateCategoryAPI(id, values.newName)
      .then(() => {
        toast.success("Danh Mục Đã Được Cập Nhật");
        onClose();
      })
      .catch((error) => {
        toast.error(`Cập Nhật Danh Mục Bị Lỗi: ${error.message}`);
      });
  };
  fetchListCategory();
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        elevation: 8,
        style: { backgroundColor: 'colors.primary[400]' },
      }}
    >
      <DialogTitle>Chỉnh Sửa Danh Mục</DialogTitle>
      <Formik
        initialValues={{ newName: '' }}
        validationSchema={validationSchema}
        onSubmit={handleEditCategorySubmit}
      >
        {({ errors, touched }) => (
          <Form style={{
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary[400] : theme.palette.common.white,
          }}
          >
            <DialogContent style={{
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary[400] : theme.palette.common.white,
            }}
            >
              <Field
                name="newName"
                as={TextField}
                type="text"
                label="Tên danh mục mới"
                error={touched.newName && errors.newName}
                helperText={touched.newName && errors.newName}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} style={{ backgroundColor: "#ffffff" }}>
                Hủy
              </Button>
              <Button type="submit" color="primary" autoFocus>
                Lưu
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
export default EditCategoryDialog;
