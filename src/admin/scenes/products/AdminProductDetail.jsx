import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  useTheme,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Button,
  styled,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AdminLayout } from '../../../layout/AdminLayout';
import { tokens } from '../../theme';
import { APIRoutes } from '../../../constants/APIRoutes';
import { getProductByIdAPI } from '../../API/ProductAPI';
import formatDate from '../../../utils/formatDate';
import formatMoney from '../../../utils/formatMoney';

function ProductDetailComponent() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${APIRoutes.GET_PRODUCT_BY_ID}/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleChange = (event, newValue) => {
    setSelectedImage(newValue);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box flexGrow={2} sx={{ ml: 4 }} alignItems="center" justifyContent="center">
        {product.productImages && (
          <Box maxWidth="500px" height="500px" mt={0} justifyContent="center" alignItems="center">
            <img
              src={`${axios.defaults.baseURL + product.productImages[selectedImage]}`}
              srcSet={`${axios.defaults.baseURL + product.productImages[selectedImage]}`}
              alt={product.productImages[selectedImage]}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
            <Paper square>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                }}
              >
                <Tabs
                  value={selectedImage}
                  indicatorColor={theme.palette.mode === 'light' ? 'primary' : 'white'}
                  variant="scrollable"
                  textColor={theme.palette.mode === 'light' ? 'primary' : 'white'}
                  onChange={handleChange}
                  aria-label="Image tabs"
                  sx={{
                    '& .MuiTabs-indicator': {
                      backgroundColor: theme.palette.mode === 'light' ? 'primary' : 'white',
                    },
                  }}
                >
                  {product.productImages
                && product.productImages.map((item, index) => (
                  <Tab key={item} label={`ảnh ${index + 1}`} />
                ))}
                </Tabs>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
      <Box flexGrow={1} sx={{ mt: 4 }}>
        <Card sx={{ maxWidth: 450 }}>
          <CardHeader
            title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>{product.name}</span>}
            subheader={`Ngày tạo: ${formatDate(product.createdDate)}`}
          />
          <CardContent>
            <Typography variant="h4" sx={{ mb: 2 }}>
              <strong>Giá:</strong> {formatMoney(product.price)}
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>
              <strong>Tồn kho:</strong> {product.quantity}
            </Typography>
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              <strong>Danh mục:</strong> {product.categoryName}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h4" paragraph>
              <strong>Mô tả:</strong>
            </Typography>
            <Typography variant="h5" paragraph>
              {product.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{ justifyContent: 'flex-end', mr: 6, mb: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => history.push(`/admin/products/${id}/edit`)}
            >
              Chỉnh sửa
            </Button>
          </CardActions>
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
