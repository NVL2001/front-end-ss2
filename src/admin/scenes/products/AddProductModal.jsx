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
import { tokens } from '../../theme';
import Header from '../../components/Header';

const API_URL = 'https://example.com/api/products';

function AddProductModal() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [id, setId] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(API_URL, { name, description, price }).then(() => {
      setName('');
      setDescription('');
      setPrice('');
      handleClose();
    });
  };

  const ModalWrapper = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '500px',
    backgroundColor: colors.primary[400],
    boxShadow: theme.shadows[5],
    p: theme.spacing(2),
    outline: 'none',
  }));

  const FormWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  }));

  return (
    <div>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: '14px',
          fontWeight: 'bold',
          padding: '10px 20px',
          borderRadius: 0,
        }}
        onClick={handleOpen}
      >
        Thêm sản phẩm
      </Button>
      <Modal open={open} onClose={handleClose}>
        <ModalWrapper>
          <Header paddingLeft="20px" title=" Thêm Sản Phẩm" />
          <form onSubmit={handleSubmit}>
            <FormWrapper>
              <TextField
                label="Tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Giá"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    step=".01"
                    required
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Số lượng"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    required
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <TextField
                label="Tên danh mục"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="ID sản phẩm"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
              <Typography variant="subtitle1" sx={{ color: 'white' }}>Tải ảnh sản phẩm (tối đa 5 ảnh)</Typography>
              <input type="file" accept="image/*" multiple onChange={(e) => setPicture(e.target.files)} />
              <Box display="flex" justifyContent="flex-end">
                <Button
                  sx={{
                    backgroundColor: colors.primary.main,
                    color: colors.grey[100],
                    fontSize: '14px',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    borderRadius: 0,
                    marginTop: theme.spacing(2),
                  }}
                  type="submit"
                >
                  Lưu
                </Button>
                <Button
                  sx={{
                    backgroundColor: colors.primary.main,
                    color: colors.grey[100],
                    fontSize: '14px',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    borderRadius: 0,
                    marginTop: theme.spacing(2),
                    marginLeft: theme.spacing(2),
                  }}
                  onClick={handleClose}
                >
                  Huỷ
                </Button>
              </Box>
            </FormWrapper>
          </form>
        </ModalWrapper>
      </Modal>
    </div>
  );
}

export default AddProductModal;
