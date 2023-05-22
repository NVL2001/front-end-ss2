import React, { useCallback } from "react";
import {
  Box,
  Modal,
  Typography,
  styled,
  Card,
  Avatar,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  FormControl,
  FormLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
/*eslint-disable*/
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Form, Field } from "react-final-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login, getUserInfo } from "../../api/auth";
import { UserRoles } from "../../constants/UserRoles";
import { setAxiosAuthorizeHeader } from "../../infra/http";

export function LoginModal({ open, onClose }) {
  const { user, setUser } = useAuth();
  const history = useHistory();

  const onSubmit = useCallback(async (value) => {
    try {
      const { data } = await login(value);
      setAxiosAuthorizeHeader(data.jwtToken);
      const { data: userInfo } = await getUserInfo();

      setUser({
        address: userInfo.address,
        avatarURL: userInfo.avatarURL,
        dob: userInfo.dob,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phoneNumber: userInfo.phoneNumber,
        username: userInfo.username,
      });

      toast.success("Đăng nhập thành công");
      const userRoles = data.roles.map((role) => role.name);

      if (
        userRoles.includes(UserRoles.ADMIN) ||
        userRoles.includes(UserRoles.STAFF)
      ) {
        history.replace("/admin/dashboard");
      }

      onClose();
    } catch (err) {
      toast.error("Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại!");
    }
  }, []);

  const validate = useCallback((value) => {
    const error = {};
    if (!value.username) {
      error.username = "Tên đăng nhập là bắt buộc";
    }
    if (!value.password) {
      error.password = "Mật khẩu là bắt buộc";
    }
    return error;
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <StyledCard>
        <Box
          sx={{
            marginTop: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", margin: "0 auto" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" align="center">
            Đăng nhập
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, errors, hasValidationErrors }) => (
              <>
                <Grid container spacing={2}>
                  <Field
                    name="username"
                    render={({ input, meta }) => (
                      <Grid item xs={12}>
                        <FormControl
                          fullWidth
                          required
                          error={errors.username && meta.touched}
                        >
                          <FormLabel>
                            <Typography>Tên đăng nhập</Typography>
                          </FormLabel>
                          <OutlinedInput {...input} />
                          {errors.username && meta.touched && (
                            <FormHelperText>{errors.username}</FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    )}
                  />
                  <Field
                    name="password"
                    render={({ input, meta }) => (
                      <Grid item xs={12}>
                        <FormControl
                          fullWidth
                          required
                          error={errors.password && meta.touched}
                        >
                          <FormLabel>
                            <Typography>Mật khẩu</Typography>
                          </FormLabel>
                          <OutlinedInput
                            type="password"
                            {...input}
                            autoComplete="off"
                          />
                          {errors.password && meta.touched && (
                            <FormHelperText>{errors.password}</FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    )}
                  />
                </Grid>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  sx={{
                    mt: 1,
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                  disabled={hasValidationErrors}
                >
                  Đăng nhập
                </Button>
                {/* <Button >
                  Chưa có tài khoản? Đăng ký ngay!
                </Button> */}
              </>
            )}
          />
        </Box>
      </StyledCard>
    </Modal>
  );
}

const StyledCard = styled(Card)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
}));
