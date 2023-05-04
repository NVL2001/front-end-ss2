/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
import {
<<<<<<< Updated upstream
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
=======
  Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Input, Avatar
} from "@mui/material";
import {
  Formik, Form, Field, formik
} from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { getListCategoryAPI } from "../../API/CategoryAPI";
import Header from "../../components/Header";
import { AdminLayout } from "../../../layout/AdminLayout";
import { tokens } from "../../theme";
import { addProductNewAPI } from "../../API/ProductAPI";

function AddProductFormComponent() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
>>>>>>> Stashed changes

  const [categories, setCategories] = useState([]);
  const [previewImageUrl, setPreviewImageUrl] = useState();
  const [previewImageFile, setPreviewImageFile] = useState();
  const [saveImages, setImages] = useState([]);

  const fetchListProduct = function () {
    getListCategoryAPI().then((response) => {
      setCategories(response);
    });
  };
  // Khai báo useEffect, useEffect này khi component được mount và mỗi khi State: listProduct thay đổi
  useEffect(() => {
    fetchListProduct();
  }, []);

  const [imagePreviews, setImagePreviews] = useState("");

  const imageInputFile = useRef(null);
  const onChangeImageInput = (e) => {
    // Assuming only image
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setPreviewImageUrl(reader.result);
      setPreviewImageFile(file);
      setImages([...saveImages, file]);
    };
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
<<<<<<< Updated upstream
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
=======
        initialValues={{
          id: "",
          name: "",
          description: "",
          price: "",
          quantity: "",
          categoryName: "",
        }}
        validationSchema={Yup.object({
          //
        })}
        onSubmit={async (values) => {
          try {
            const newProd = {
              name: values.name,
              description: values.description,
              price: values.price,
              quantity: values.quantity,
              category: values.categoryName,
              // eslint-disable-next-line global-require
              images: previewImageFile,
              // images: [...images, previewAvatarFile],
            };
            await addProductNewAPI(newProd).then((response) => {
              // alert("Thêm sản phẩm mới thành công!");
              // console.log("response", newProd.images);
            });
          } catch (error) {
            alert(error);
          }
        }}
>>>>>>> Stashed changes
      >
        {({
          values, errors, touched, handleBlur, handleChange, handleSubmit
        }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                label="ID Sản Phẩm"
                name="id"
<<<<<<< Updated upstream
                value={values.id}
=======
                // value={values.id}
>>>>>>> Stashed changes
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.id && errors.id}
                helperText={touched.id && errors.id}
                required
                fullWidth
                variant="filled"
<<<<<<< Updated upstream
                sx={{ gridColumn: 'span 2' }}
=======
                sx={{ gridColumn: "span 2" }}
>>>>>>> Stashed changes
              />
              <TextField
                label="Tên sản phẩm"
                name="name"
<<<<<<< Updated upstream
                value={values.name}
=======
                // value={values.name}
>>>>>>> Stashed changes
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
                required
                fullWidth
                variant="filled"
<<<<<<< Updated upstream
                sx={{ gridColumn: 'span 2' }}
=======
                sx={{ gridColumn: "span 2" }}
>>>>>>> Stashed changes
              />
              <TextField
                label="Giá sản phẩm"
                name="price"
<<<<<<< Updated upstream
                value={values.price}
=======
                // value={values.price}
>>>>>>> Stashed changes
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && errors.price}
                helperText={touched.price && errors.price}
                required
                fullWidth
                variant="filled"
<<<<<<< Updated upstream
                sx={{ gridColumn: 'span 2' }}
=======
                sx={{ gridColumn: "span 2" }}
>>>>>>> Stashed changes
              />
              <TextField
                label="Số lượng sản phẩm"
                name="quantity"
<<<<<<< Updated upstream
                value={values.quantity}
=======
                // value={values.quantity}
>>>>>>> Stashed changes
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.quantity && errors.quantity}
                helperText={touched.quantity && errors.quantity}
                required
                fullWidth
                variant="filled"
<<<<<<< Updated upstream
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
=======
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel>Danh mục sản phẩm</InputLabel>
                <Field as={Select} error={touched.categoryId && !!errors.categoryId} name="categoryId">
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {/* <MenuItem key={category.id}> */}
>>>>>>> Stashed changes
                      {category.name}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
<<<<<<< Updated upstream
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
=======
              {/* <input accept="image/*" style={{ display: "none" }} id="image-upload" type="file" multiple onChange={handleImageChange} /> */}
              {/* {imagePreviews && (
>>>>>>> Stashed changes
                <div>
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Product Preview ${index + 1}`}
                    />
                  ))}
                </div>
<<<<<<< Updated upstream
              )}

=======
              )} */}
              <Avatar
                alt="Remy Sharp"
                src={
                  // eslint-disable-next-line global-require
                  previewImageUrl || require(`../../images/default-thumbnail.jpg`)
                }
                sx={{ width: 200, height: 200, marginTop: "20px" }}
              />
              <label htmlFor="image-upload">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  onClick={() => imageInputFile.current.click()}
                >
                  Tải Ảnh
                </Button>
                <input accept="image/*" type="file" id="avatarInput" ref={imageInputFile} multiple onChange={onChangeImageInput} style={{ display: "none" }} />
              </label>
>>>>>>> Stashed changes
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mô tả sản phẩm"
                onBlur={handleBlur}
                onChange={handleChange}
<<<<<<< Updated upstream
                value={values.description}
                name="email"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: 'span 4' }}
=======
                // value={values.description}
                name="email"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
>>>>>>> Stashed changes
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Thêm Sản Phẩm Mới
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

<<<<<<< Updated upstream
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

=======
>>>>>>> Stashed changes
function AddProductForm() {
  return (
    <AdminLayout>
      <AddProductFormComponent />
    </AdminLayout>
  );
}

export default AddProductForm;
