/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
import {
  Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Input, Avatar, Typography
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
import { addProdToDiscountAPI, getListDiscountAPI } from "../../API/DiscountAPI";

function AddProdDiscountFormComponent() {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [discounts, setDiscounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [discount, setDiscount] = useState();
  const [selectedDiscount, setSelectedDiscount] = useState();

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

  const productDropdown = products.map((item, index) => (
    <MenuItem value={item} key={index}>
      {item}
    </MenuItem>
  ));

  const discountDropdown = discounts.map((item, index) => (
    <MenuItem value={item} key={index}>
      {item.code}
    </MenuItem>
  ));

  const handleProductChange = (event) => {
    const product = event.target.value;
    setSelectedProducts(product);
  };
  const handleDiscountChange = (event) => {
    const discountCode = event.target.value;
    setSelectedDiscount(discountCode.code);
  };

  useEffect(() => {
    fetchListDiscount();
    fetchListProduct();
  }, []);

  return (
    <Box m="20px">
      <Header title="Thêm Sản Phẩm Vào Chương Trình Giảm Giá" />

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
              discount: selectedDiscount,
              products: selectedProducts
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
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Box>
                <Typography variant="subtitle1">Mã chương trình giảm giá</Typography>
                <Select
                  fullWidth
                  value={selectedDiscount}
                  onChange={(discount) => handleDiscountChange(discount)}
                  variant="outlined"
                >
                  {discountDropdown}
                </Select>
              </Box>
              <Box>
                <Typography variant="subtitle1">Sản phẩm</Typography>
                <Select
                  fullWidth
                  value={selectedProducts}
                  onChange={(product) => handleProductChange(product)}
                  variant="outlined"
                  multiple
                >
                  {productDropdown}
                </Select>
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Thêm Sản Phẩm
              </Button>
            </Box>
          </Form>
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
