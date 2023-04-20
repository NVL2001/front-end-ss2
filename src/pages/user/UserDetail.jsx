import React, { useState } from "react";
import "./user.css";
import {
  Box, Card, styled, Stack, Avatar, Typography, Grid
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HomeIcon from '@mui/icons-material/Home';
import { useAuth } from "../../context/AuthContext";

const ActiveTab = {
  PERSONAL_INFORMATION: "PERSONAL_INFORMATION",
  ORDER_HISTORY: "ORDER_HISTORY",
  VOUCHERS: "VOUCHERS"
};

function UserProfile() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState(ActiveTab.PERSONAL_INFORMATION);

  if (!user) {
    return <div />;
  }

  const changeTab = (tab) => {
    setCurrentTab(tab);
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
          Personal Information
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
                <Typography variant="h3">Name</Typography>
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
                <Typography variant="h3">Date Of Birth</Typography>
                <Typography variant="body1">{user.dob ?? "N/A"}</Typography>
              </Stack>
              <CalendarMonthIcon fontSize="large" htmlColor="rgb(229, 140, 115)" />
            </Stack>
          </StyledInforCard>
        </Grid>
        <Grid item xs={6}>
          <StyledInforCard>
            <Stack direction="row" justifyContent="space-between">
              <Stack rowGap={1} alignItems="flex-start">
                <Typography variant="h3">Email</Typography>
                <Typography variant="body1">{user.email ?? "N/A"}</Typography>
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
        <StyledAvatar alt="user avatar" src={user.avatarURL ?? ""} />
        <Box pt={4}>
          <Typography variant="h3">{user.username}</Typography>
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
