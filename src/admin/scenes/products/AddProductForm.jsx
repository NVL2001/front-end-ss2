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
} from '@mui/material';
import {
  Formik, Form, Field, formik
} from 'formik';
import * as Yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getListCategoryAPI } from '../../API/CategoryAPI';
import Header from '../../components/Header';
import { AdminLayout } from '../../../layout/AdminLayout';
import { tokens } from '../../theme';

function AddProductFormComponent() {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const [categories, setCategories] = useState([]);
  const fetchListProduct = function () {
    getListCategoryAPI().then((response) => {
      setCategories(response);
    });
  };
  // Khai báo useEffect, useEffect này khi component được mount và mỗi khi State: listProduct thay đổi
  useEffect(() => {
    fetchListProduct();
  }, []);

  const [imagePreviews, setImagePreviews] = useState('');
  const handleImageChange = (e) => {
    const { files } = e.target;
    const images = Array.from(files).slice(0, 5);
    Formik.setFieldValue('images', images);

    const previewUrls = images.map((productImages) => URL.createObjectURL(productImages));
    setImagePreviews(previewUrls);
  };
  // const handleSubmit = async (values) => {
  //   if (imagePreviews.length >= 1 && imagePreviews.length <= 5) {
  //     try {
  //       const imageData = new FormData(); // FormData lưu dữ liệu ảnh
  //       imagePreviews.forEach((imagePreview, index) => {
  //         imageData.append(`image${index}`, imagePreview);
  //       });

  //       // const imageUploadResponse = await axios.post(
  //       //   'url hình ảnh',
  //       //   imageData
  //       // );
  //       // const uploadedImageUrls = imageUploadResponse.data.urls;

  //       // const productData = {
  //       //   ...values,
  //       //   images: uploadedImageUrls,
  //       // };

  //       console.log(productData);
  // Gửi dữ liệu đến API để thêm mới sản phẩm
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   } else {
  //     alert('Vui lòng tải lên từ 1 đến 5 hình ảnh.');
  //   }
  // };

  return (
    <Box m="20px">
      <Header title="Thêm Sản Phẩm Mới" />

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
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                label="ID Sản Phẩm"
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
              />
              <TextField
                label="Tên sản phẩm"
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
              <TextField
                label="Giá sản phẩm"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && errors.price}
                helperText={touched.price && errors.price}
                required
                fullWidth
                variant="filled"
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                label="Số lượng sản phẩm"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.quantity && errors.quantity}
                helperText={touched.quantity && errors.quantity}
                required
                fullWidth
                variant="filled"
                sx={{ gridColumn: 'span 2' }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: 'span 2' }}
              >
                <InputLabel>Danh mục sản phẩm</InputLabel>
                <Field
                  as={Select}
                  error={touched.categoryId && !!errors.categoryId}
                  name="categoryId"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                multiple
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <button component="span">Tải Ảnh</button>
              </label>
              {imagePreviews && (
                <div>
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Product Preview ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mô tả sản phẩm"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="email"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Thêm Sản Phẩm Mới
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

const validationSchema = Yup.object().shape({
  id: Yup.string().required('Vui lòng điền ID sản phẩm'),
  name: Yup.string().required('Vui lòng điền tên sản phẩm'),
  price: Yup.number()
    .required('Vui lòng điền giá sản phẩm').positive().min(1)
    .typeError('Vui lòng nhập đúng định dạng giá sản phẩm'),
  quantity: Yup.number()
    .required('Vui lòng điền số lượng sản phẩm')
    .integer()
    .typeError('Vui lòng nhập đúng định dạng giá sản phẩm')
    .min(1),
  categoryName: Yup.string().required('Vui lòng chọn danh mục sản phẩm'),
  productImages: Yup.array()
    .min(1, 'Vui lòng tải lên ít nhất 1 hình ảnh.')
    .max(5, 'Vui lòng không tải lên quá 5 hình ảnh.')
    .required('Hình ảnh không được bỏ trống'),
});

const initialValues = {
  id: '',
  name: '',
  description: '',
  price: '',
  quantity: '',
  categoryName: '',
  productImages: [],
};

function AddProductForm() {
  return (
    <AdminLayout>
      <AddProductFormComponent />
    </AdminLayout>
  );
}

export default AddProductForm;
