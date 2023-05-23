/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  useTheme,
} from '@mui/material';
import {
  Formik, Form, Field, formik
} from 'formik';
import * as Yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Header from '../../components/Header';
import { AdminLayout } from "../../../layout/AdminLayout";
import { tokens } from '../../theme';

function AddCategoryFormComponent() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const history = useHistory();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const { name } = values;

      const apiUrl = `http://localhost:8080/api/category/create-category?name=${encodeURIComponent(name)}`;

      const response = await axios.post(apiUrl);

      if (response.status === 200 || response.status === 201) {
        toast.success("Thêm danh mục thành công");
        history.replace("/admin/categories");
      } else {
        toast.error("Thêm danh mục thất bại");
      }
    } catch (error) {
      // Xử lý lỗi mạng hoặc lỗi không liên quan đến phản hồi của API
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <Header title="Thêm Danh Mục Mới" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form
            style={{
              background: colors.primary[400]
            }}
            onSubmit={handleSubmit}
          >
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                label="ID Danh Mục (Được Thêm Tự Động)"
                name="id"
                value={values.id}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.id && errors.id}
                helperText={touched.id && errors.id}
                required
                fullWidth
                variant="filled"
                sx={{ gridColumn: 'span 2' }}
                disabled
              />
              <TextField
                label="Tên Danh Mục"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
                required
                fullWidth
                variant="filled"
                sx={{ gridColumn: 'span 2' }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Thêm Danh Mục Mới
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Tên danh mục phải có ít nhất 2 ký tự')
    .max(100, 'Tên danh mục không được vượt quá 100 ký tự')
    .required('Vui lòng điền tên danh mục'),
});

const initialValues = {
  id: '',
  name: '',
};

function AddCategoryForm() {
  return (
    <AdminLayout>
      <AddCategoryFormComponent />
    </AdminLayout>
  );
}
export default AddCategoryForm;
