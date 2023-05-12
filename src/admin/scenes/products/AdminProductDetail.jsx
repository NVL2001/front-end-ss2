import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  ImageList,
  ImageListItem,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper, styled, IconButton, Card, CardHeader, CardContent, CardActions
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

  React.useEffect(() => {
    fetchData().then((product) => {
      setProduct(product);
    });
  }, []);

  return (
    <Box display="flex" flexDirection="row">
      <Box flexGrow={1}>
        {/* <ImageList cols={2}> */}
        {/*  {product.productImages */}
        {/*        && product.productImages.map((item, index) => ( */}
        {/*          <ImageListItem key={item} sx={{ maxWidth: '200px', height: 'auto', }}> */}
        {/*            <img */}
        {/*              src={`${axios.defaults.baseURL + item}`} */}
        {/*              srcSet={`${axios.defaults.baseURL + item}`} */}
        {/*              alt={item} */}
        {/*              style={{ width: '100%', height: 'auto', }} */}
        {/*            /> */}
        {/*          </ImageListItem> */}
        {/*        ))} */}
        {/* </ImageList> */}
        <Paper square>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'flex-start',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <Tabs
              value={selectedImage}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="Image tabs"
            >
              {product.productImages
                  && product.productImages.map((item, index) => (
                    <Tab key={item} label={`Hình ảnh ${index + 1}`} />
                  ))}
            </Tabs>
          </Box>
        </Paper>
        {product.productImages && (
          <ImageList cols={1}>
            <ImageListItem sx={{ maxWidth: '300px', height: '300px', }}>
              <img
                src={`${axios.defaults.baseURL + product.productImages[selectedImage]}`}
                srcSet={`${axios.defaults.baseURL + product.productImages[selectedImage]}`}
                alt={product.productImages[selectedImage]}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </ImageListItem>
          </ImageList>
        )}
      </Box>
      <Box flexGrow={1} ml={2}>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            title={product.name}
            subheader={`Ngày tạo: ${formatDate(product.createdDate)}`}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {`Giá: ${formatMoney(product.price)}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Tồn kho: ${product.quantity}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Phân loại: ${product.categoryName}`}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <Button variant="secondary">Chỉnh sửa</Button>
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Mô tả:</Typography>
              <Typography paragraph>
                {product.description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Box>
    </Box>
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
