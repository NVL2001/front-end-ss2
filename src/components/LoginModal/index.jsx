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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Form, Field } from "react-final-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
<<<<<<< HEAD
import { useAuth } from "../../context/AuthContext";
import { login } from "../../api/auth";
import { AdminRoles } from "../../constants/UserRoles";
=======
import { useAuth } from '../../context/AuthContext';
import { login } from '../../api/auth';
import { UserRoles } from "../../constants/UserRoles";
<<<<<<< Updated upstream
=======
>>>>>>> d26fa72eb654ca9455f28d6dfaca9c889fcad368
>>>>>>> Stashed changes

export function LoginModal({ open, onClose }) {
  const { setUser } = useAuth();
  const history = useHistory();
  const onSubmit = useCallback(async (value) => {
    try {
      const { data } = await login(value);
<<<<<<< HEAD
      toast.success("Đăng nhập thành công!");
=======
      toast.success('Login successful');
      const userRoles = data.roles.map((role) => role.name);
<<<<<<< Updated upstream
=======
>>>>>>> d26fa72eb654ca9455f28d6dfaca9c889fcad368
>>>>>>> Stashed changes

      if (userRoles.includes(UserRoles.ADMIN) || userRoles.includes(UserRoles.STAFF)) {
        history.replace("/admin/dashboard");
      }

      setUser({
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
        name: data.username,
        email: "johndoe@example.com",
        phone: "555-555-5555",
        address: "123 Main St.",
=======
>>>>>>> Stashed changes
        name: data.userName,
        email: 'johndoe@example.com',
        phone: data.phoneNumber || "",
        address: '123 Main St.',
>>>>>>> d26fa72eb654ca9455f28d6dfaca9c889fcad368
        shoppingHistory: [],
        vouchers: [],
      });
      onClose();
    } catch (err) {
      toast.error("Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại!");
    }
  }, []);

  const validate = useCallback((value) => {
    const error = {};
    if (!value.username) {
      error.username = "User Name is required";
    }
    if (!value.password) {
      error.password = "Password is required";
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
                <Typography>Quên mật khẩu?</Typography>
                <Button>Chưa có tài khoản? Đăng ký ngay!</Button>
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
