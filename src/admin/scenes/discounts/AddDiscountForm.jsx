/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
import {
  Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Input, Avatar, Grid, useTheme
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

import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { toast } from "react-toastify";

import Header from "../../components/Header";
import { AdminLayout } from "../../../layout/AdminLayout";
import { tokens } from "../../theme";
import { addProductNewAPI, getListProductAPI } from "../../API/ProductAPI";
import { createDiscountAPI, getListDiscountAPI } from "../../API/DiscountAPI";
import { StyledMenu } from "../../../utils/components/StyledMenu";

function AddDiscountFormComponent() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [discounts, setDiscounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
          startDate: null,
          endDate: null
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
          <Box>
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
                  flexGrow: 1,
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
                  sx={{
                    gridColumn: "span 2",
                    background: colors.primary[400]
                  }}
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
                  sx={{
                    gridColumn: "span 2",
                    background: colors.primary[400]
                  }}
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
                  sx={{
                    gridColumn: "span 4",
                    background: colors.primary[400]
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Thời gian bắt đầu"
                    ampm={false}
                    hours="24h"
                    sx={{
                      gridColumn: "span 1",
                      background: colors.primary[400]
                    }}
                  />
                  <DatePicker
                    label="Ngày bắt đầu"
                    sx={{
                      gridColumn: "span 1",
                      background: colors.primary[400]
                    }}
                    views={["day", "month", "year"]}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Thời gian kết thúc"
                    ampm={false}
                    hours="24h"
                    sx={{
                      gridColumn: "span 1",
                      background: colors.primary[400]
                    }}
                  />
                  <DatePicker
                    label="Ngày kết thúc"
                    sx={{
                      gridColumn: "span 1",
                      background: colors.primary[400]
                    }}
                    renderInput={(params) => <TextField name="endDate" {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Thêm Sản Phẩm Mới
                </Button>
              </Box>
            </Form>
          </Box>
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
