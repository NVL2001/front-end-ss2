/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
import { useParams } from "react-router";
import {
  Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Input, Avatar, Typography, Grid, useTheme
} from "@mui/material";
import {
  Formik, Form, Field, formik
} from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { getListCategoryAPI } from "../../API/CategoryAPI";
import Header from "../../components/Header";
import { AdminLayout } from "../../../layout/AdminLayout";
import { tokens } from "../../theme";
import { addProdImgAPI, addProductNewAPI, getProductByIdAPI } from "../../API/ProductAPI";
import { APIRoutes } from "../../../constants/APIRoutes";

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
              Thêm Ảnh
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

function EditProductFormComponent() {
  const history = useHistory();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const productId = useParams();
  const [categories, setCategories] = useState([]);
  const [editProd, setEditProd] = useState(false);
  const [product, setProduct] = useState(false);
  const [images, setImages] = useState([]);
  const initProd = JSON.parse(localStorage.getItem("editProduct"));
  const fetchCategory = function () {
    getListCategoryAPI().then((response) => {
      setCategories(response);
    });
  };
  const fetchEditProduct = function () {
    getProductByIdAPI(productId.id).then((response) => {
      setProduct(response);
    });
  };

  const handleImagesSelected = (selectedImages) => {
    // Handle the selected images here
    setImages(selectedImages);
  };

  const handleDeleteImage = (index) => {
    const newImages = [...initProd.productImages];
    newImages.splice(index, 1); // Remove the image at the specified index
    // Save the modified array back to localStorage
    const updatedProduct = {
      ...initProd,
      productImages: newImages,
    };
    localStorage.setItem("editProduct", JSON.stringify(updatedProduct));
    setEditProd(updatedProduct);
  };

  // Khai báo useEffect, useEffect này khi component được mount và mỗi khi State: listProduct thay đổi
  useEffect(() => {
    fetchCategory();
    fetchEditProduct();
  }, [editProd]);

  return (
    <Box m="20px">
      <Header title="Chỉnh Sửa Sản Phẩm" />

      <Formik
        initialValues={{
          name: initProd.name,
          description: initProd.description,
          price: initProd.price,
          quantity: initProd.quantity,
          categoryName: initProd.categoryName,
        }}
        validationSchema={Yup.object({
          //
        })}
        onSubmit={async (values) => {
          const config = {
            headers: {
              ...axios.defaults.headers,
              // 'Content-Type': 'multipart/form-data'
              'Content-Type': 'application/json'
            }
          };

          try {
            const formData = new FormData();
            // // const enc = new TextEncoder();
            // // const blob = images.map((im) => new Blob([new Uint8Array(im)], { type: "image/jpeg" }))[0];
            // // const blob = new Blob([enc.encode(images[0])], { type: "image/jpeg" });
            formData.append('productID', initProd.id);
            // formData.append('description', values.description);
            // formData.append('price', values.price);
            // formData.append('quantity', values.quantity);
            // formData.append('categoryName', values.categoryName);
            // console.log(`${formData.get('description')} ${formData.get('categoryName')}`);
            if (images.length > 0) {
              Array.from(images).forEach((file) => {
                formData.append('images', file);
                addProdImgAPI(formData);
              }); // phải sử dụng append mới là binary, nếu cho nguyên array vào thì nó vẫn là type object?
            }
            const jsonBody = {
              id: initProd.id,
              name: values.name,
              description: values.description,
              price: values.price,
              quantity: values.quantity,
              newCategory: values.categoryName,
              productImages: []
            };
            const response = await axios.post(APIRoutes.UPDATE_PRODUCT, jsonBody, config);
            if (response.status === 200) {
              toast.success("Chỉnh sửa sản phẩm thành công", {
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => history.push('/admin/products'), 1000);
            }
          } catch (error) {
            console.log(error);
            toast.error("Sửa sản phẩm thất bại. Vui lòng thử lại.", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }}
      >
        {({
          values, errors, touched, handleBlur, handleChange, submitForm
        }) => (
          <Form style={{
            background: colors.primary[400]
          }}
          >
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
                defaultValue={initProd.name}
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
                defaultValue={initProd.price}
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
                defaultValue={initProd.quantity}
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mô tả sản phẩm"
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={initProd.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              {!Array.isArray(initProd.productImages) ? <div>Giá trị không hợp lệ</div>
                : <Grid container spacing={2}>
                  {initProd.productImages.map((image, index) => (
                    <Grid key={index} item xs={6}>
                      <div style={{ width: '100%', paddingBottom: '100%', position: 'relative' }}>
                        <img
                          src={`${axios.defaults.baseURL}${image}`}
                          style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: "pointer"
                          }}
                          onClick={() => {
                            handleDeleteImage(index);
                          }}
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>}
              <ImageUpload imagesForUpload={images} onImagesSelected={handleImagesSelected} />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Chỉnh Sửa Sản Phẩm
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

function EditProductForm() {
  return (
    <AdminLayout>
      <EditProductFormComponent />
    </AdminLayout>
  );
}

export default EditProductForm;
