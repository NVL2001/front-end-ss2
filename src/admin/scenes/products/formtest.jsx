import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { addProductNewAPI } from '../../API/ProductAPI';
import { tokens } from '../../theme';

// Assign the URL of the API to add products
const API_URL = 'https://example.com/api/products';

// Create a modal to add a new product
function AddProductModal() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const ModalWrapper = styled(Box)(({ theme }) => ({

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '500px',
    backgroundColor: colors.blueAccent[700],
    boxShadow: theme.shadows[5],
    p: theme.spacing(2),
    outline: 'none',
  }));

  // Create states to handle the opening and closing of the modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    id: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    picture: [],
  };

  const validationSchema = Yup.object().shape({
    id: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.number().required('Required').positive().min(1),
    quantity: Yup.number().required('Required').integer().min(1),
    category: Yup.string().required('Required'),
  });

  // Handle adding the product when the form is submitted
  const onSubmit = (values) => {
    // Send the API request to add the product
    axios.post(API_URL, values).then(() => {
      // Once the request is complete, reset the form and close the modal
      handleClose();
    }).catch((e) => console.log(e));
  };

  return (
    <div>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: '14px',
          fontWeight: 'bold',
          padding: '10px 20px',
        }}
        onClick={handleOpen}
      >
        Thêm Sản Phẩm
      </Button>
      <Modal open={open} onClose={handleClose}>
        <ModalWrapper>
          <Typography variant="h6">Thêm sản phẩm</Typography>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="ID Sản Phẩm"
                      name="id"
                      value={formik.values.id}
                      onChange={formik.handleChange}
                      error={formik.touched.id && Boolean(formik.errors.id)}
                      helperText={formik.touched.id && formik.errors.id}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Tên Sản Phẩm"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Mô Tả"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Giá"
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      type="number"
                      step=".01"
                      error={formik.touched.price && Boolean(formik.errors.price)}
                      helperText={formik.touched.price && formik.errors.price}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Số Lượng"
                      name="quantity"
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                      type="number"
                      error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                      helperText={formik.touched.quantity && formik.errors.quantity}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Tên Danh Mục"
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      error={formik.touched.category && Boolean(formik.errors.category)}
                      helperText={formik.touched.category && formik.errors.category}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => {
                        formik.setFieldValue('picture', e.target.files);
                      }}
                      multiple
                    />
                  </Grid>
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                      sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                      }}
                      type="submit"
                      disabled={!formik.isValid}
                    >
                      Lưu
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                      }}
                      onClick={handleClose}
                    >
                      Huỷ
                    </Button>
                  </Box>
                </Grid>
              </form>
            )}
          </Formik>
        </ModalWrapper>
      </Modal>
    </div>
  );
}

export default AddProductModal;
