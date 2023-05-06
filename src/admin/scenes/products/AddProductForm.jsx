/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
import {
  Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Input, Avatar, Typography, Grid
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
import { APIRoutes } from "../../../constants/APIRoutes";

function AddProductFormComponent() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  const fetchListProduct = function () {
    getListCategoryAPI().then((response) => {
      setCategories(response);
    });
  };

  const handleImagesSelected = (selectedImages) => {
    // Handle the selected images here
    setImages(selectedImages);
  };
    // Khai báo useEffect, useEffect này khi component được mount và mỗi khi State: listProduct thay đổi
  useEffect(() => {
    fetchListProduct();
  }, []);

  return (
    <Box m="20px">
      <Header title="Thêm Sản Phẩm Mới" />

      <Formik
        initialValues={{
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
          const config = {
            headers: {
              ...axios.defaults.headers,
              'Content-Type': 'multipart/form-data'
            }
          };

          try {
            const formData = new FormData();
            // const enc = new TextEncoder();
            // const blob = images.map((im) => new Blob([new Uint8Array(im)], { type: "image/jpeg" }))[0];
            // const blob = new Blob([enc.encode(images[0])], { type: "image/jpeg" });
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('price', values.price);
            formData.append('quantity', values.quantity);
            formData.append('categoryName', values.categoryName);
            console.log(`${formData.get('description')} ${formData.get('categoryName')}`);

            Array.from(images).forEach((file) => {
              formData.append('images', file);
            }); // phải sử dụng append mới là binary, nếu cho nguyên array vào thì nó vẫn là type object?

            const response = await axios.post(APIRoutes.CREATE_PRODUCT, formData, config);
            if (response.status === 200) {
              alert("Tạo mới sản phẩm thành công");
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({
          values, errors, touched, handleBlur, handleChange, submitForm
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
                label="Tên sản phẩm"
                name="name"
                                // value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
                required
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Giá sản phẩm"
                name="price"
                                // value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && errors.price}
                helperText={touched.price && errors.price}
                required
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Số lượng sản phẩm"
                name="quantity"
                                // value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.quantity && errors.quantity}
                helperText={touched.quantity && errors.quantity}
                required
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel>Danh mục sản phẩm</InputLabel>
                <Field as={Select} error={touched.categoryId && !!errors.categoryId} name="categoryName">
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {/* <MenuItem key={category.id}> */}
                      {category.name}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              <ImageUpload imagesForUpload={images} onImagesSelected={handleImagesSelected} />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mô tả sản phẩm"
                onBlur={handleBlur}
                onChange={handleChange}
                                // value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
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

function ImageUpload({ onImagesSelected, imagesForUpload }) {
  const [exceedLimit, setExceedLimit] = useState(false);
  const [imageForPreview, setImageForPreview] = useState([]);

  const chooseImageForUpload = (event) => {
    const { files } = event.target;
    const newImagesForPreview = [...imageForPreview];
    const newImagesForUpload = [...imagesForUpload];

    if (newImagesForUpload.length + files.length > 6) {
      setExceedLimit(true);
      return;
    }

    setExceedLimit(false);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      // reader.readAsBinaryString(file);

      reader.onload = (e) => {
        newImagesForPreview.push(e.target.result);
        // const binaryStr = reader.result;
        newImagesForUpload.push(file);

        if (newImagesForUpload.length === imagesForUpload.length + files.length) {
          setImageForPreview(newImagesForPreview);
          onImagesSelected(newImagesForUpload); // Invoke the callback function with the uploaded images
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAddMore = (event) => {
    event.preventDefault();
    const uploadInput = document.getElementById('upload-image');
    uploadInput.value = null;
    uploadInput.click();
  };

  const handleDeleteImage = (index) => {
    const newImagesForPreview = [...imageForPreview];
    const newImagesForUpload = [...imagesForUpload];

    newImagesForPreview.splice(index, 1);
    newImagesForUpload.splice(index, 1);

    onImagesSelected(newImagesForUpload);
    setImageForPreview(newImagesForPreview);
  };

  return (
    <div>
      {exceedLimit && (
        <Typography variant="body2" color="error">
          Maximum of 6 images allowed.
        </Typography>
      )}

      {imageForPreview.length < 6 && (
        <div>
          <InputLabel htmlFor="upload-image">
            {/* <Button component="span" variant="contained"> */}
            {/*  Chọn ảnh */}
            {/* </Button> */}
            {imageForPreview.length < 6 && (
            <Button variant="contained" onClick={handleAddMore}>
              Thêm mới
            </Button>
            )}
          </InputLabel>
          <input
            type="file"
            id="upload-image"
            accept="image/*"
            multiple // Enable selecting multiple images
            style={{ display: 'none' }}
            onChange={chooseImageForUpload}
          />
        </div>
      )}

      <Grid container spacing={2}>
        {imageForPreview.map((image, index) => (
          <Grid key={index} item xs={6}>
            <div style={{ width: '100%', paddingBottom: '100%', position: 'relative' }}>
              <img
                src={image}
                alt={`Preview ${index}`}
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'
                }}
                onClick={() => {
                  handleDeleteImage(index);
                }}
              />
            </div>
          </Grid>
        ))}
      </Grid>

      {imageForPreview.length > 0 && (
        <Typography variant="subtitle1" align="center">
          {`${imageForPreview.length} image(s) selected`}
        </Typography>
      )}

    </div>
  );
}

function AddProductForm() {
  return (
    <AdminLayout>
      <AddProductFormComponent />
    </AdminLayout>
  );
}

export default AddProductForm;
