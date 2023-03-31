import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material';
import AddProductButton from './AddProductButton';
import { tokens } from '../../theme';

function BasicModal() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: '14px',
          fontWeight: 'bold',
          padding: '10px 20px',
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Thêm Sản Phẩm
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{
          style: {
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          },
        }}
      >
        <DialogTitle>Thêm Sản Phẩm Mới</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="id" label="ID Sản Phẩm" type="email" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleClose}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default BasicModal;
