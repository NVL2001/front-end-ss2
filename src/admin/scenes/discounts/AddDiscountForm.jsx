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
import {
  DatePicker, DateTimePicker, LocalizationProvider, TimePicker
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { toast } from "react-toastify";

import { useHistory } from "react-router-dom";
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
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const history = useHistory();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formatTime = (date) => {
    const time = new Date(date.$d);

    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    const year = time.getFullYear();
    const month = String(time.getMonth() + 1).padStart(2, "0");
    const day = String(time.getDate()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handelSearchProduct = (value) => {
    if (value === "") setSearchProducts(products);
    const res = products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));
    setSearchProducts(res);
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
  const onClickRemoveSelectedProduct = (product) => {
    setSelectedProducts(
      selectedProducts.filter((e) => e.id !== product.id)
    );
  };

  useEffect(() => {
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
          startDate: "",
          endDate: ""
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
                startDate: `${startTime}`,
                endDate: `${endTime}`,
              },
              productIds: selectedProducts.map((pro) => pro.id)
            };
            console.log(jsonBody);

            await createDiscountAPI(jsonBody);

            toast.success("Thêm chương trình giảm giá thành công.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            history.push("/admin/discounts");
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
                  <DateTimePicker
                    label="Thời gian bắt đầu"
                    ampm={false}
                    hours="24h"
                    sx={{
                      gridColumn: "span 2",
                      background: colors.primary[400]
                    }}
                    onChange={(time) => setStartTime(formatTime(time))}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Thời gian kết thúc"
                    ampm={false}
                    hours="24h"
                    sx={{
                      gridColumn: "span 2",
                      background: colors.primary[400]
                    }}
                    onChange={(time) => setEndTime(formatTime(time))}
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
                      key={product.id}
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
