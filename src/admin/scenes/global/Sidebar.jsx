/* eslint-disable max-len */
import { React, useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {
  Box, IconButton, Typography, useTheme,
} from '@mui/material';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { tokens } from '../../theme';
import { useAuth } from '../../../context/AuthContext';

function Item({
  title, to, icon, selected, setSelected,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: `${colors.grey[100]}`,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
}

function Sidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');
  const { user, setUser } = useAuth();
  const history = useHistory();

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    // eslint-disable-next-line dot-notation
    delete axios.defaults.headers['Authorization'];
    history.push("/");
  };
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0px 20px 0px",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Rose Secret
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Admin
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Trang Chủ"
              to="/admin/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Quản Lý Cửa Hàng
            </Typography>
            <Item
              title="Danh Mục"
              to="/admin/categories"
              icon={<CategoryOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sản Phẩm"
              to="/admin/products"
              icon={<ListOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Đơn Hàng"
              to="/admin/orders"
              icon={<ShoppingBagOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Thống Kê"
              to="/admin/statistics"
              icon={<AnalyticsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Chiến Dịch"
              to="/admin/discounts"
              icon={<DiscountOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Tài Khoản
            </Typography>
            {/* <Item title="Cài Đặt Tài Khoản" to="/admin/form" icon={<ManageAccountsOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Quản Lý Tài Khoản" to="/admin/team" icon={<ManageAccountsOutlinedIcon />} selected={selected} setSelected={setSelected} /> */}
            <MenuItem
              onClick={handleSignOut}
              style={{
                color: colors.grey[100],
              }}
              icon={<LogoutOutlinedIcon />}
            >
              <Typography>Đăng Xuất</Typography>
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
}

export default Sidebar;
