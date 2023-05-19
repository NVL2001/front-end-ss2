import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  ImageList,
  ImageListItem,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper, styled, IconButton, Card, CardHeader, CardContent, CardActions, Grid
} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import { AdminLayout } from '../../../layout/AdminLayout';
import { APIRoutes } from '../../../constants/APIRoutes';
import formatDate from "../../../utils/formatDate";
import formatMoney from "../../../utils/formatMoney";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ProductDetailComponent() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fetchData = async () => {
    const response = await axios.get(`${APIRoutes.GET_PRODUCT_BY_ID}/${id}`);
    return response.data;
  };

  const handleChange = (event, newValue) => {
    setSelectedImage(newValue);
  };

  useEffect(() => {
    fetchData().then((product) => {
      console.log(product);
      setProduct(product);
    });
  }, []);

  return (
    <Grid container spacing={2} margin={5}>
      <Paper elevation={3}>
        <ImageList sx={{ width: 600, height: 550 }} cols={3} rowHeight={164}>
          {product.productImages && product.productImages.map((url) => (
            <ImageListItem key={url}>
              <img
                src={`${axios.defaults.baseURL + url}?w=200&h=200&fit=crop&auto=format`}
                srcSet={`${axios.defaults.baseURL + url}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>
    </Grid>
  );
}

function AdminProductDetail() {
  return (
    <AdminLayout>
      <ProductDetailComponent />
    </AdminLayout>
  );
}

export default AdminProductDetail;
