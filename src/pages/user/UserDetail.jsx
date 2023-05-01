import React, { useEffect, useState } from "react";
import "./user.css";
import {
  Box, Card, styled, Stack, Avatar, Typography, Grid, Button, Modal
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HomeIcon from '@mui/icons-material/Home';
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import formatDate from "../../utils/formatDate";
import { APIRoutes } from "../../constants/APIRoutes";

const ActiveTab = {
  PERSONAL_INFORMATION: "PERSONAL_INFORMATION",
  ORDER_HISTORY: "ORDER_HISTORY",
  VOUCHERS: "VOUCHERS"
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function UserProfile() {
  const { user, setUserAvatar } = useAuth();
  const [currentTab, setCurrentTab] = useState(ActiveTab.PERSONAL_INFORMATION);
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageForUpload, setImageForUpload] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {

  }, [user]);

  if (!user) {
    return <div />;
  }

  const changeTab = (tab) => {
    setCurrentTab(tab);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageForUpload(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleSubmitImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', imageForUpload);
      const config = {
        headers: {
          ...axios.defaults.headers,
          'Content-Type': 'multipart/form-data'
        }
      };

      const response = await axios.post(APIRoutes.EDIT_USER_AVATAR, formData, config);
      toast.success("Upload avatar thành công");
      setUserAvatar(response.data);
      handleClose();
    } catch (error) {
      console.error('Error occurred while uploading image:', error);
    }
  };

  const changeActiveColor = (tab) => {
    if (currentTab === tab) {
      return "rgb(229, 140, 115)";
    }
    return "";
  };

  const renderPersonalInformation = () => (
    <Box>
      <Stack rowGap={2} pb={5}>
        <Typography variant="h2">
          Thông tin cá nhân
        </Typography>
        <Typography variant="body1">
          Manage your personal information, including phone numbers
          and email address where you can be contacted
        </Typography>
      </Stack>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <StyledInforCard>
            <Stack direction="row" justifyContent="space-between">
              <Stack rowGap={1} alignItems="flex-start">
                <Typography variant="h3">Username</Typography>
                <Typography variant="body1">{user.username}</Typography>
              </Stack>
              <AccountCircleIcon fontSize="large" htmlColor="rgb(229, 140, 115)" />
            </Stack>
          </StyledInforCard>
        </Grid>
        <Grid item xs={6}>
          <StyledInforCard>
            <Stack direction="row" justifyContent="space-between">
              <Stack rowGap={1} alignItems="flex-start">
                <Typography variant="h3">Ngày sinh</Typography>
                <Typography variant="body1">{user.dob ? formatDate(user.dob).split(" ")[1] : "N/A"}</Typography>
              </Stack>
              <CalendarMonthIcon fontSize="large" htmlColor="rgb(229, 140, 115)" />
            </Stack>
          </StyledInforCard>
        </Grid>
        <Grid item xs={6}>
          <StyledInforCard>
            <Stack direction="row" justifyContent="space-between">
              <Stack rowGap={1} alignItems="flex-start">
                <Typography variant="h3">Số điện thoại</Typography>
                <Typography variant="body1">{user.phoneNumber ?? "N/A"}</Typography>
              </Stack>
              <AlternateEmailIcon fontSize="large" htmlColor="rgb(229, 140, 115)" />
            </Stack>
          </StyledInforCard>
        </Grid>
        <Grid item xs={6}>
          <StyledInforCard>
            <Stack direction="row" justifyContent="space-between">
              <Stack rowGap={1} alignItems="flex-start">
                <Typography variant="h3">Address</Typography>
                <Typography variant="body1">{user.address ?? "N/A"}</Typography>
              </Stack>
              <HomeIcon fontSize="large" htmlColor="rgb(229, 140, 115)" />
            </Stack>
          </StyledInforCard>
        </Grid>
      </Grid>
    </Box>
  );

  const renderOrderHistory = () => {
    const commonHeader = (
      <Stack rowGap={2} pb={5}>
        <Typography variant="h2">
          Order History
        </Typography>
        <Typography variant="body1">
          See what you have ordered
        </Typography>
      </Stack>
    );
    if (!user.shoppingHistory || user.shoppingHistory.length === 0) {
      return (
        <Box>
          {commonHeader}
          <Typography variant="body1">There is no order yet!</Typography>
        </Box>
      );
    }
    return (
      <Box>
        {commonHeader}
        <Box>
          <ul>
            {user.shoppingHistory.map((item) => (
              <li key={item.id}>
                {item.name} -{item.price}
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    );
  };

  const renderVouchers = () => {
    const commonHeader = (
      <Stack rowGap={2} pb={5}>
        <Typography variant="h2">
          Vouchers
        </Typography>
        <Typography variant="body1">
          See all your vouchers
        </Typography>
      </Stack>
    );
    if (!user.vouchers || user.vouchers.length === 0) {
      return (
        <Box>
          {commonHeader}
          <Typography variant="body1">You have no vouchers!</Typography>
        </Box>
      );
    }
    return (
      <Box>
        {commonHeader}
        <Box>
          <ul>
            {user.vouchers.map((voucher) => (
              <li key={voucher.id}>
                {voucher.code} -{voucher.amount}
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    );
  };

  const renderBody = () => {
    if (currentTab === ActiveTab.ORDER_HISTORY) {
      return renderOrderHistory();
    }
    if (currentTab === ActiveTab.VOUCHERS) {
      return renderVouchers();
    }
    return renderPersonalInformation();
  };

  return (
    <Stack direction="row" maxWidth="lg" margin="0 auto" py={12} columnGap={8}>
      <Box>
        <StyledAvatar alt="user avatar" src={axios.defaults.baseURL + user.avatarURL ?? ""} />
        <Button onClick={handleOpen}>
          {
          user.avatarURL ? "Sửa ảnh" : "Chọn ảnh"
        }
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {selectedImage ? (
              <>
                <Avatar
                  src={selectedImage}
                  sx={{ width: 200, height: 200, mb: 2 }}
                />
                <Button
                  variant="contained"
                  component="span"
                  onClick={handleSubmitImage}
                  style={{
                    marginBottom: 3
                  }}
                >
                  Upload ảnh
                </Button>
              </>
            ) : (
              ""
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="upload-image"
            />
            <label htmlFor="upload-image">
              <Button variant="contained" component="span">
                Chọn ảnh
              </Button>
            </label>
          </Box>
        </Modal>
        <Box pt={4}>
          <Typography variant="h3">{`${user.firstName} ${user.lastName}`}</Typography>
          <Typography variant="body1">{user.email ?? "N/A"}</Typography>
        </Box>
        <Stack rowGap={2} pt={6}>
          <Typography
            variant="h3"
            sx={{ cursor: "pointer", color: changeActiveColor(ActiveTab.PERSONAL_INFORMATION) }}
            onClick={() => changeTab(ActiveTab.PERSONAL_INFORMATION)}
          >
            Personal Information
          </Typography>
          <Typography
            variant="h3"
            sx={{ cursor: "pointer", color: changeActiveColor(ActiveTab.ORDER_HISTORY) }}
            onClick={() => changeTab(ActiveTab.ORDER_HISTORY)}
          >
            Order History
          </Typography>
          <Typography
            variant="h3"
            sx={{ cursor: "pointer", color: changeActiveColor(ActiveTab.VOUCHERS) }}
            onClick={() => changeTab(ActiveTab.VOUCHERS)}
          >
            Vouchers
          </Typography>
        </Stack>
      </Box>
      {renderBody()}
    </Stack>
  );
}

export default UserProfile;

const StyledAvatar = styled(Avatar)(() => ({
  width: 120,
  height: 120,
}));

const StyledInforCard = styled(Card)(() => ({
  borderRadius: 20,
  boxShadow: "none",
  border: "1px solid rgba(0, 0, 0, 0.1)"
}));
