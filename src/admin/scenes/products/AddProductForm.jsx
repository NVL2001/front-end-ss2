/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
import {
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

  const [categories, setCategories] = useState([]);
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState();
  const [previewAvatarFile, setPreviewAvatarFile] = useState();
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

  const avatarInputFile = useRef(null);
  const onChangeAvatarInput = (e) => {
    // Assuming only image
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setPreviewAvatarUrl(reader.result);
      setPreviewAvatarFile(file);
      setImages([...saveImages, file]);
    };
  };

  return (
    <Box m="20px">
      <Header title="Thêm Sản Phẩm Mới" />

      <Formik
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
              images: previewAvatarFile,
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
                // value={values.id}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.id && errors.id}
                helperText={touched.id && errors.id}
                required
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              />
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
                <Field as={Select} error={touched.categoryId && !!errors.categoryId} name="categoryId">
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {/* <MenuItem key={category.id}> */}
                      {category.name}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              {/* <input accept="image/*" style={{ display: "none" }} id="image-upload" type="file" multiple onChange={handleImageChange} /> */}
              {/* {imagePreviews && (
                <div>
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Product Preview ${index + 1}`}
                    />
                  ))}
                </div>
              )} */}
              <Avatar
                alt="Remy Sharp"
                src={
                  // eslint-disable-next-line global-require
                  previewAvatarUrl || require(`../../images/default-thumbnail.jpg`)
                }
                sx={{ width: 200, height: 200, marginTop: "20px" }}
              />
              <label htmlFor="image-upload">
                <button component="span" onClick={() => avatarInputFile.current.click()}>
                  Tải Ảnh
                </button>
                <input accept="image/*" type="file" id="avatarInput" ref={avatarInputFile} multiple onChange={onChangeAvatarInput} style={{ display: "none" }} />
              </label>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mô tả sản phẩm"
                onBlur={handleBlur}
                onChange={handleChange}
                // value={values.description}
                name="email"
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

function AddProductForm() {
  return (
    <AdminLayout>
      <AddProductFormComponent />
    </AdminLayout>
  );
}

export default AddProductForm;
