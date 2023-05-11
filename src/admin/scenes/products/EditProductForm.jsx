/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
import { useParams } from "react-router";
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
import { addProductNewAPI, getProductByIdAPI } from "../../API/ProductAPI";
import { APIRoutes } from "../../../constants/APIRoutes";

function EditProductFormComponent() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const productId = useParams();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(false);
  const [images, setImages] = useState([]);
  const initProd = JSON.parse(localStorage.getItem("editProduct"));
  const fetchCategory = function () {
    getListCategoryAPI().then((response) => {
      console.log("getListCategoryAPI", response);
      setCategories(response);
    });
  };

  const handleImagesSelected = (selectedImages) => {
    // Handle the selected images here
    setImages(selectedImages);
  };
  // Khai báo useEffect, useEffect này khi component được mount và mỗi khi State: listProduct thay đổi
  useEffect(() => {
    fetchCategory();
  }, []);

  console.log("getProductByIdAPI", initProd.id);
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
            // const formData = new FormData();
            // // const enc = new TextEncoder();
            // // const blob = images.map((im) => new Blob([new Uint8Array(im)], { type: "image/jpeg" }))[0];
            // // const blob = new Blob([enc.encode(images[0])], { type: "image/jpeg" });
            // formData.append('name', values.name);
            // formData.append('description', values.description);
            // formData.append('price', values.price);
            // formData.append('quantity', values.quantity);
            // formData.append('categoryName', values.categoryName);
            // console.log(`${formData.get('description')} ${formData.get('categoryName')}`);

            // Array.from(images).forEach((file) => {
            //   formData.append('images', file);
            // }); // phải sử dụng append mới là binary, nếu cho nguyên array vào thì nó vẫn là type object?
            const jsonBody = {
              id: initProd.id,
              name: values.name,
              description: values.description,
              price: values.price,
              quantity: values.quantity,
              newCategory: values.categoryName
            };
            const response = await axios.post(APIRoutes.UPDATE_PRODUCT, jsonBody, config);
            if (response.status === 200) {
              alert("Chỉnh sửa sản phẩm thành công");
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
