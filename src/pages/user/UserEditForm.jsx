import React, { useCallback } from "react";
import {
  Box,
  Modal,
  Typography,
  styled,
  Card,
  Button,
  Grid,
  FormControl,
  FormLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
/*eslint-disable*/
import { Form, Field } from "react-final-form";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import {login, updateUserInfo} from "../../api/auth";
import {DatePicker} from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { deDE } from '@mui/x-date-pickers/locales';

export function UserEditForm({ open, onSubmit, onClose }) {
    const { user } = useAuth();

    const validate = useCallback((value) => {
        const error = {};
        if (value.phoneNumber && !/^\d+$/.test(value.phoneNumber)) {
            error.phoneNumber = "Chỉ nhập số";
        }
        else if (!/^\d{10}$/.test(value.phoneNumber)) {
            error.phoneNumber = "Số điện thoại phải có 10 số";
        }

        return error;
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} localeText={deDE.components.MuiLocalizationProvider.defaultProps.localeText}>
            <Modal open={open} onClose={onClose}>
                <StyledCard>
                    <Box
                        sx={{
                            marginTop: 2,
                        }}
                    >
                        <Form
                            onSubmit={onSubmit}
                            validate={validate}
                            render={({ handleSubmit, errors, hasValidationErrors }) => (
                                <>
                                    <Grid container spacing={2}>
                                        <Field
                                            name="username"
                                            defaultValue={user.username}
                                            render={({ input }) => (
                                                <Grid item xs={12}>
                                                    <FormControl
                                                        fullWidth
                                                    >
                                                        <FormLabel>
                                                            <Typography>Tên Đăng Nhập</Typography>
                                                        </FormLabel>
                                                        <OutlinedInput {...input} />
                                                    </FormControl>
                                                </Grid>
                                            )}
                                        />
                                        <Field
                                            name="dob"
                                            render={({ input }) => (
                                                <Grid item xs={12}>
                                                    <FormControl
                                                        fullWidth
                                                    >
                                                        <FormLabel>
                                                            <Typography>Ngày Sinh</Typography>
                                                        </FormLabel>
                                                        <DatePicker defaultValue={user.dob} onChange={(value) => input.onChange(value) }/>
                                                    </FormControl>
                                                </Grid>
                                            )}
                                        />
                                        <Field
                                            name="phoneNumber"
                                            defaultValue={user.phoneNumber}
                                            render={({ input, meta }) => (
                                                <Grid item xs={12}>
                                                    <FormControl
                                                        fullWidth
                                                        error={errors.phoneNumber && meta.touched}
                                                    >
                                                        <FormLabel>
                                                            <Typography>Số điện thoại</Typography>
                                                        </FormLabel>
                                                        <OutlinedInput {...input} />
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
                                            name="address"
                                            defaultValue={user.address}
                                            render={({ input }) => (
                                                <Grid item xs={12}>
                                                    <FormControl
                                                        fullWidth
                                                    >
                                                        <FormLabel>
                                                            <Typography>Địa Chỉ</Typography>
                                                        </FormLabel>
                                                        <OutlinedInput
                                                            {...input}
                                                        />
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
                                        Đồng ý
                                    </Button>
                                </>
                            )}
                        />
                    </Box>
                </StyledCard>
            </Modal>
        </LocalizationProvider>
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
