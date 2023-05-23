/*eslint-disable*/
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {Avatar, Box, styled, Typography, useTheme} from "@mui/material";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {tokens} from "../../theme";

function SearchInputAdmin({ products, onSearchProduct, onSelectedProductChange }) {
    const renderOption = (props, product) => (
        <li {...props} onClick={() => onSelectedProductChange(product)}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar src={product.imageUrl[0] ? (axios.defaults.baseURL + product.imageUrl[0]) : null}
                        alt={product.name} />
                <Typography variant="body1" sx={{ ml: 2 }}>
                    {product.name}
                </Typography>
            </Box>
        </li>
    );

    const getOptionLabel = (option) => {
        if (option && option.name) {
            return option.name;
        }
        return "";
    };

    return (
        <Autocomplete
            id="product-search"
            options={products}
            getOptionLabel={getOptionLabel}
            onInputChange={(event, value) => onSearchProduct(value)}
            renderInput={(params) => (
                <StyledWrapper>
                    <TextField
                        {...params}
                        placeholder="Nhập từ tìm kiếm..."
                        variant="outlined"
                        sx={{
                            width: 500,

                        }}
                    />
                </StyledWrapper>
            )}
            renderOption={renderOption}
        />
    );
}

export default SearchInputAdmin;

const StyledWrapper = styled("div")(() => ({
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
        outline: "none",
    },
    "& .MuiInputBase-root": {
        paddingTop: 0,
        paddingBottom: 0,
    },
}));
