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
  Typography,
  Menu,
  styled,
  alpha,
  useTheme, Stack
} from "@mui/material";
import {
  Formik, Form, Field, formik
} from "formik";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FileUploadIcon from "@mui/icons-material/FileUpload";
// import { DatePicker } from '@mui/x-date-pickers';
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { AdminLayout } from "../../../layout/AdminLayout";
import { tokens } from "../../theme";
import { addProductNewAPI, getListProductAPI } from "../../API/ProductAPI";
import { addProdToDiscountAPI, getListDiscountAPI } from "../../API/DiscountAPI";
import { StyledMenu } from "../../../utils/components/StyledMenu";
import { APIRoutes } from "../../../constants/APIRoutes";
import SearchInputAdmin from "../AdminSearch/AdminSearchInput";

function AddProdDiscountFormComponent() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();
  const discountId = location.state.id;
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  const handelSearchProduct = (value) => {
    if (value === "") setSearchProducts(products);
    const res = products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));
    setSearchProducts(res);
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
    <Box
      m="20px"
    >
      <Header title={`Thêm Sản Phẩm Vào Chương Trình Giảm Giá có mã ${discountId}`} />

      <Formik
        initialValues={{
          id: "",
          name: "",
          discount: "",
        }}
        validationSchema={Yup.object({
          //
        })}
        onSubmit={async (values) => {
          try {
            const jsonBody = {
              discount: discountId,
              products: selectedProducts.map((pro) => pro.id)
            };

            addProdToDiscountAPI(jsonBody);
            toast.success("Thêm sản phẩm thành công.", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => history.push('/admin/discounts'), 1000);
          } catch (error) {
            toast.error("Thêm sản phẩm thất bại. Vui lòng thử lại.", {
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
              <SearchInputAdmin
                products={searchProducts}
                onSearchProduct={handelSearchProduct}
                onSelectedProductChange={handleSelectedProductChange}
              />
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Thêm Sản Phẩm
                </Button>
              </Box>
            </Form>

            <div style={{ width: '100%' }}>
              <Typography marginLeft={3}>Sản phẩm được chọn để thêm vào chương trình</Typography>
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

function AddProdDiscountForm() {
  return (
    <AdminLayout>
      <AddProdDiscountFormComponent />
    </AdminLayout>
  );
}

export default AddProdDiscountForm;
