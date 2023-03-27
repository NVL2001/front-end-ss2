import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  Box,
  Modal,
  Typography,
  styled,
  Card,
  Avatar,
  Button,
  Grid, OutlinedInput, FormControl, FormLabel, FormHelperText,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Form, Field } from 'react-final-form';
import { register } from '../../api/auth';

export function RegisterModal({ open, onClose }) {
  const onSubmit = useCallback(async (value) => {
    try {
      await register(value);
      toast.success('Register successful');
      onClose();
    } catch (err) {
      toast.error('Something went wrong, try again later');
    }
  }, []);

  const validate = useCallback((value) => {
    const error = {};
    if (!value.firstName) {
      error.firstName = 'First Name is required';
    }
    if (!value.lastName) {
      error.lastName = 'Last Name is required';
    }
    if (!value.username) {
      error.username = 'User Name is required';
    }
    if (!value.phoneNumber) {
      error.phoneNumber = 'Phone Number is required';
    }
    if (!value.password) {
      error.password = 'Password is required';
    }
    if (value.phoneNumber && value.phoneNumber.match(/^[A-Za-z]+$/)) {
      error.phoneNumber = 'Only number is allowed';
    }
    return error;
  }, []);

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <StyledCard>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, errors, hasValidationErrors }) => (
              <>
                <Grid container spacing={2}>
                  <Field
                    name="firstName"
                    render={({ input, meta }) => (
                      <Grid item xs={12}>
                        <FormControl fullWidth required error={errors.firstName && meta.touched}>
                          <FormLabel>
                            <Typography>First Name</Typography>
                          </FormLabel>
                          <OutlinedInput {...input} />
                          {errors.firstName && meta.touched && (
                            <FormHelperText>
                              {errors.firstName}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    )}
                  />
                  <Field
                    name="lastName"
                    render={({ input, meta }) => (
                      <Grid item xs={12}>
                        <FormControl fullWidth required error={errors.lastName && meta.touched}>
                          <FormLabel>
                            <Typography>Last Name</Typography>
                          </FormLabel>
                          <OutlinedInput {...input} />
                          {errors.lastName && meta.touched && (
                            <FormHelperText>
                              {errors.lastName}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    )}
                  />
                  <Field
                    name="username"
                    render={({ input, meta }) => (
                      <Grid item xs={12}>
                        <FormControl fullWidth required error={errors.username && meta.touched}>
                          <FormLabel>
                            <Typography>User Name</Typography>
                          </FormLabel>
                          <OutlinedInput {...input} />
                          {errors.username && meta.touched && (
                            <FormHelperText>
                              {errors.username}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    )}
                  />
                  <Field
                    name="phoneNumber"
                    render={({ input, meta }) => (
                      <Grid item xs={12}>
                        <FormControl fullWidth required error={errors.phoneNumber && meta.touched}>
                          <FormLabel>
                            <Typography>Phone Number</Typography>
                          </FormLabel>
                          <OutlinedInput {...input} autoComplete="off" />
                          {errors.phoneNumber && meta.touched && (
                            <FormHelperText>
                              {errors.phoneNumber}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    )}
                  />
                  <Field
                    name="password"
                    render={({ input, meta }) => (
                      <Grid item xs={12}>
                        <FormControl fullWidth required error={errors.password && meta.touched}>
                          <FormLabel>
                            <Typography>
                              Password
                            </Typography>
                          </FormLabel>
                          <OutlinedInput type="password" {...input} autoComplete="off" />
                          {errors.password && meta.touched && (
                            <FormHelperText>
                              {errors.password}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    )}
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                  disabled={hasValidationErrors}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Typography>Already have an account? Sign in</Typography>
                  </Grid>
                </Grid>
              </>
            )}
          />
        </Box>
      </StyledCard>
    </Modal>
  );
}

const StyledCard = styled(Card)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4,
}));
