/* eslint-disable*/
import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {
    Autocomplete,
    Button,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import logo from "../../components/assets/images/logo.png";
import {LoginModal} from "../../components/LoginModal";
import {RegisterModal} from "../../components/RegisterModal";
import {useAuth} from "../../context/AuthContext";
import {useProduct} from "../../context/ProductContext";
import axios from "axios";
import {APIRoutes} from "../../constants/APIRoutes";

function Search() {
    const {CartItem, clearItem, setCartItem} = useProduct();

    const {user, setUser} = useAuth();
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState([])
    const history = useHistory();

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },
        ]



    useEffect(() => {
      handleSearch();
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = async (value) => {
        const response = await axios.get(APIRoutes.SEARCH_PRODUCT_AND_CATEGORT, {
            params: {
                q: searchValue
            }
        });
        const data = response.data;
        setSearchData(data)
    };

    const handleInputChange = (event, value) => {
        setSearchValue(value);
        console.log(searchValue)
    };

    const handleSubmit = () => {
        handleSearch(searchValue);
    };



    const handleOpenLoginModal = () => {
        setOpenLoginModal(true);
    };

    const handleCloseLoginModal = () => {
        setOpenLoginModal(false);
    };

    const handleOpenRegisterModal = () => {
        setOpenRegisterModal(true);
    };

    const handleCloseRegisterModal = () => {
        setOpenRegisterModal(false);
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {

        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
        clearItem();
        setCartItem([]);
        delete axios.defaults.headers['Authorization'];
        history.push("/")
    };

    return (
        <section className="search">
            <div className="container c_flex">
                <div className="logo width ">
                    <a href="/">
                        <img src={logo} alt=""/>
                    </a>
                </div>

                <div className="search-box f_flex" aria-label="search">
                    <i className="fa fa-search"/>
                        <Autocomplete id="search" type="text" placeholder="Nhập tên sản phẩm hoặc loại sản phẩm"
                                      disablePortal={true}
                                      options={top100Films}
                                      sx={{ width: '90%', boxShadow: 'none' }}
                                      onInputChange={handleInputChange}
                                      renderInput={(params) => <TextField {...params} />}
                           />
                    <div className="autocom-box"/>
                    <Button variant="submit" onClick={handleSubmit}>Tìm kiếm</Button>
                </div>

                <Stack
                    direction="row"
                    alignItems="center"
                    className="icon f_flex width"
                    columnGap={1}
                >
                    {user ? (
                        <div>
                            <div className="user" onClick={handleClick}>
                                <i className="fa fa-user icon-circle"/>
                            </div>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={!!anchorEl}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                            >
                                <Link to="/user">
                                    <MenuItem>Tài khoản của tôi</MenuItem>
                                </Link>
                                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <>
                            <Button onClick={handleOpenLoginModal}>
                                <Typography sx={{color: "#ffffff", textTransform: "none"}}>
                                    Login
                                </Typography>
                            </Button>
                            <Button onClick={handleOpenRegisterModal}>
                                <Typography sx={{color: "#ffffff", textTransform: "none"}}>
                                    Sign Up
                                </Typography>
                            </Button>
                        </>
                    )}
                    <Link to="/cart">
                        <div className="cart">
                            <i className="fa fa-shopping-bag icon-circle"/>
                            <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
                        </div>
                    </Link>
                </Stack>
            </div>
            <LoginModal open={openLoginModal} onClose={handleCloseLoginModal}/>
            <RegisterModal
                open={openRegisterModal}
                onClose={handleCloseRegisterModal}
            />
        </section>
    );
}

export default Search;
