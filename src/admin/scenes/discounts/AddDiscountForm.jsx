/* eslint-disable import/no-unresolved */
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
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import FileUploadIcon from "@mui/icons-material/FileUpload";
// import { DatePicker } from '@mui/x-date-pickers';
import { toast } from "react-toastify";
import Header from "../../components/Header";
import { AdminLayout } from "../../../layout/AdminLayout";
import { tokens } from "../../theme";
import { addProductNewAPI, getListProductAPI } from "../../API/ProductAPI";
import { createDiscountAPI, getListDiscountAPI } from "../../API/DiscountAPI";

function AddDiscountFormComponent() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [discounts, setDiscounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState();
  const [previewAvatarFile, setPreviewAvatarFile] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const fetchListDiscount = function () {
    getListDiscountAPI().then((response) => {
      setDiscounts(response);
    });
  };

  const fetchListProduct = function () {
    const listProductIds = [];
    getListProductAPI().then((response) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const r of response.pageItems) {
        listProductIds.push(r.id);
      }
      setProducts(listProductIds);
    });
  };

  const itemDropdown = products.map((item, index) => (
    <MenuItem value={item} key={index}>
      {item}
    </MenuItem>
  ));

  const handleProductChange = (event) => {
    const product = event.target.value;
    setSelectedProducts(product);
  };

  useEffect(() => {
    fetchListDiscount();
    fetchListProduct();
  }, []);

  return (
    <Box m="20px">
      <Header title="Thêm Chương Trình Giảm Giá Mới" />

      <Formik
        initialValues={{
          id: "",
          name: "",
          description: "",
          discountPercent: "",
        }}
        validationSchema={Yup.object({
          //
        })}
        onSubmit={async (values) => {
          try {
            const jsonBody = {
              discountDTO: {
                description: values.description,
                discountPercent: values.discountPercent,
                startDate: values.startDate,
                endDate: values.endDate,
              },
              productIds: selectedProducts
            };
            createDiscountAPI(jsonBody);
            toast.success("Thêm chương trình giảm giá thành công.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } catch (error) {
            toast.error("Thêm chương trình giảm giá thất bại. Vui lòng thử lại.", {
              position: "top-right",
              autoClose: 3000,
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
                label="ID Giảm Giá Được Tạo Tự Động"
                name="code"
                // value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.code && errors.code}
                helperText={touched.code && errors.code}
                required
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                disabled
              />
              <TextField
                label="Phần Trăm Giảm Giá"
                name="discountPercent"
                // value={values.discountPercent}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.discountPercent && errors.discountPercent}
                helperText={touched.discountPercent && errors.discountPercent}
                required
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Mô Tả Chương Trình Giảm Giá"
                name="description"
                // value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && errors.description}
                helperText={touched.description && errors.description}
                required
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              />
              {/* <DatePicker
                label="Ngày tạo chương trình"
                name="startDate"
                  // value={selectedDate}
                  // onChange={(date) => setSelectedDate(date)}
                onBlur={handleBlur}
                required
                fullWidth
                inputVariant="filled"
                sx={{ gridColumn: "span 2" }}
              />
              <DatePicker
                label="Ngày kết thúc chương trình"
                name="endDate"
                  // value={selectedDate}
                  // onChange={(date) => setSelectedDate(date)}
                onBlur={handleBlur}
                required
                fullWidth
                inputVariant="filled"
                sx={{ gridColumn: "span 2" }}
              /> */}
              {/* <Field
                label="Ngày tạo chương trình"
                name="startDate"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                onBlur={handleBlur}
                required
                fullWidth
                inputVariant="filled"
                sx={{ gridColumn: "span 2" }}
              />
              <Field
                label="Ngày kết thúc chương trình"
                name="endDate"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                onBlur={handleBlur}
                required
                fullWidth
                inputVariant="filled"
                sx={{ gridColumn: "span 2" }}
              /> */}
              <Field
                name="startDate"
                type="text"
                label="Ngày Bắt Đầu"
                error={touched.startDate && errors.startDate}
                helperText={touched.startDate && errors.startDate}
              />
              <Field
                name="endDate"
                type="text"
                label="Ngày Kết Thúc"
                error={touched.endDate && errors.endDate}
                helperText={touched.endDate && errors.endDate}
              />
              <Select
                fullWidth
                value={selectedProducts}
                onChange={(product) => handleProductChange(product)}
                variant="outlined"
                label="Phân quyền"
                multiple
              // sx={{ marginTop: 16 }}
              >
                {itemDropdown}
              </Select>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Thêm Chương Trình Mới
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

function AddDiscountForm() {
  return (
    <AdminLayout>
      <AddDiscountFormComponent />
    </AdminLayout>
  );
}

export default AddDiscountForm;
