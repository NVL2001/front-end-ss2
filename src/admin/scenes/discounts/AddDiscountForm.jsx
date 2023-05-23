/* eslint-disable import/no-unresolved */
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
  Avatar,
  useTheme,
  debounce,
  Stack,
  Typography
} from "@mui/material";
import {
  Formik, Form, Field, formik
} from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { toast } from "react-toastify";

import Header from "../../components/Header";
import { AdminLayout } from "../../../layout/AdminLayout";
import { tokens } from "../../theme";
import { addProductNewAPI, getListProductAPI } from "../../API/ProductAPI";
import { createDiscountAPI, getListDiscountAPI } from "../../API/DiscountAPI";
import { StyledMenu } from "../../../utils/components/StyledMenu";
import SearchInput from "../../../common/header/SearchInput";
import { APIRoutes } from "../../../constants/APIRoutes";
import SearchInputAdmin from "../AdminSearch/AdminSearchInput";

function AddDiscountFormComponent() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handelSearchProduct = (value) => {
    if (value === "") setSearchProducts(products);
    const res = products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));
    setSearchProducts(res);
  };

  const fetchListDiscount = function () {
    getListDiscountAPI().then((response) => {
      setDiscounts(response);
    });
  };

  const handleSelectedProductChange = (product) => {
    const isExist = selectedProducts.some((e) => e.id === product.id);
    if (isExist) {
      alert("Sản phẩm đã tồn tại");
    } else {
      const newSelectedProducts = [...selectedProducts];
      newSelectedProducts.push(product);
      setSelectedProducts(newSelectedProducts);
    }
  };

  const fetchListProduct = function () {
    axios.get(APIRoutes.CLIENT_SIDE_SEARCH).then((r) => {
      setProducts(r.data);
    });
  };

  const itemDropdown = products.map((item, index) => (
    <MenuItem value={item} key={index}>
      {item}
    </MenuItem>
  ));

  const onClickRemoveSelectedProduct = (product) => {
    setSelectedProducts(
      selectedProducts.filter((e) => e.id !== product.id)
    );
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
          <Stack direction="row">
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
                <Box>
                  <SearchInputAdmin
                    products={searchProducts}
                    onSearchProduct={handelSearchProduct}
                    onSelectedProductChange={handleSelectedProductChange}
                  />
                </Box>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Thêm Sản Phẩm Mới
                </Button>
              </Box>
            </Form>
            <div style={{ width: '100%' }}>
              <Typography marginLeft={3}>Sản phẫm được chọn để thêm vào chương trình</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: "wrap",
                  p: 1,
                  m: 1,
                  borderRadius: 1,
                }}
              >
                {
                  selectedProducts && selectedProducts.map((product) => (
                    <Avatar
                      sx={{
                        width: 60, height: 60, m: 1
                      }}
                      src={product.imageUrl[0] ? (axios.defaults.baseURL + product.imageUrl[0]) : null}
                      alt={product.name}
                      title={product.name}
                      onClick={() => onClickRemoveSelectedProduct(product)}
                    />
                  ))
                }
              </Box>
            </div>
          </Stack>
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
