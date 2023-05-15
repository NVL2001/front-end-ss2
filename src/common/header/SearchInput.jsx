import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {
  Avatar, Box, styled, Typography
} from "@mui/material";
import { useHistory } from "react-router-dom";
import axios from "axios";

function SearchInput({ products, onSearchProduct }) {
  const history = useHistory();
  const renderOption = (props, product) => (
    <li {...props} onClick={() => history.push(`/product/${product.id}`)}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={axios.defaults.baseURL + product.productImages[0]} alt={product.name} />
        <Typography variant="body1" sx={{ ml: 2 }}>{product.name}</Typography>
      </Box>
    </li>
  );

  return (
    <Autocomplete
      id="product-search"
      options={products}
      getOptionLabel={(option) => option.name}
      onInputChange={(event, value) => onSearchProduct(value)}
      renderInput={(params) => (
        <StyledWrapper>
          <TextField
            {...params}
            placeholder="Nhập từ tìm kiếm..."
            variant="outlined"
          />
        </StyledWrapper>
      )}
      renderOption={renderOption}
    />
  );
}

export default SearchInput;

const StyledWrapper = styled('div')(() => ({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    outline: "none"
  },
  "& .MuiInputBase-root": {
    paddingTop: 0,
    paddingBottom: 0
  }
}));
