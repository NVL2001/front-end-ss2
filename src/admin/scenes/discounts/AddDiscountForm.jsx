// /* eslint-disable import/no-unresolved */
// /* eslint-disable react/no-array-index-key */
// /* eslint-disable no-use-before-define */
// /* eslint-disable react/react-in-jsx-scope */
// /* eslint-disable max-len */
// import {
//   Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Input, Avatar
// } from "@mui/material";
// import {
//   Formik, Form, Field, formik
// } from "formik";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import * as Yup from "yup";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import { getListCategoryAPI } from "../../API/CategoryAPI";
// import Header from "../../components/Header";
// import { AdminLayout } from "../../../layout/AdminLayout";
// import { tokens } from "../../theme";
// import { addProductNewAPI } from "../../API/ProductAPI";

// function AddDiscountFormComponent() {
//   const isNonMobile = useMediaQuery("(min-width:600px)");

//   const [categories, setCategories] = useState([]);
//   const [previewAvatarUrl, setPreviewAvatarUrl] = useState();
//   const [previewAvatarFile, setPreviewAvatarFile] = useState();
//   const [saveImages, setImages] = useState([]);

//   const fetchListProduct = function () {
//     getListCategoryAPI().then((response) => {
//       setCategories(response);
//     });
//   };
//     fetchListProduct();
//   }, []);

//   const [imagePreviews, setImagePreviews] = useState("");

//   const avatarInputFile = useRef(null);
//   const onChangeAvatarInput = (e) => {
//     // Assuming only image
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onloadend = (e) => {
//       setPreviewAvatarUrl(reader.result);
//       setPreviewAvatarFile(file);
//       setImages([...saveImages, file]);
//     };
//   };

//   return (
//     <Box m="20px">
//       <Header title="Thêm Chương Trình Giảm Giá Mới" />

//       <Formik
//         initialValues={{
//           id: "",
//           name: "",
//           description: "",
//           price: "",
//           quantity: "",
//           categoryName: "",
//         }}
//         validationSchema={Yup.object({
//           //
//         })}
//         onSubmit={async (values) => {

//         }}
//       >
//         {({
//           values, errors, touched, handleBlur, handleChange, handleSubmit
//         }) => (
//           <Form>
//             <Box
//               display="grid"
//               gap="30px"
//               gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//               sx={{
//                 "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//               }}
//             >
//               <TextField
//                 label="ID Giảm Giá Được Tạo Tự Động"
//                 name="code"
//                     // value={values.code}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.code && errors.code}
//                 helperText={touched.code && errors.code}
//                 required
//                 fullWidth
//                 variant="filled"
//                 sx={{ gridColumn: "span 2" }}
//                 disabled
//               />
//               <TextField
//                 label="Phần Trăm Giảm Giá"
//                 name="discountPercent"
//                     // value={values.discountPercent}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.discountPercent && errors.discountPercent}
//                 helperText={touched.discountPercent && errors.discountPercent}
//                 required
//                 fullWidth
//                 variant="filled"
//                 sx={{ gridColumn: "span 2" }}
//               />
//               <TextField
//                 label="Mô Tả Chương Trình Giảm Giá"
//                 name="description"
//                     // value={values.description}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.description && errors.description}
//                 helperText={touched.description && errors.description}
//                 required
//                 fullWidth
//                 variant="filled"
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <DatePicker
//                 label="Ngày tạo chương trình"
//                 name="startDate"
//                   // value={selectedDate}
//                   // onChange={(date) => setSelectedDate(date)}
//                 onBlur={handleBlur}
//                 required
//                 fullWidth
//                 inputVariant="filled"
//                 sx={{ gridColumn: "span 2" }}
//               />
//               <DatePicker
//                 label="Ngày kết thúc chương trình"
//                 name="endDate"
//                   // value={selectedDate}
//                   // onChange={(date) => setSelectedDate(date)}
//                 onBlur={handleBlur}
//                 required
//                 fullWidth
//                 inputVariant="filled"
//                 sx={{ gridColumn: "span 2" }}
//               />
//             </Box>
//             <Box display="flex" justifyContent="end" mt="20px">
//               <Button type="submit" color="secondary" variant="contained">
//                 Thêm Sản Phẩm Mới
//               </Button>
//             </Box>
//           </Form>
//         )}
//       </Formik>
//     </Box>
//   );
// }

// function AddDiscountForm() {
//   return (
//     <AdminLayout>
//       <AddDiscountFormComponent />
//     </AdminLayout>
//   );
// }

// export default AddDiscountForm;
