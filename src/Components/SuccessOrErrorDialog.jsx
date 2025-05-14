// components/ErrorDialog.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { clearError } from '../Store/Slices/ErrorSlice';
import { useNavigate } from 'react-router-dom';

const ErrorDialog = () => {
  const { message, status } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(clearError());
    if (status === 401) {
      navigate('/login'); // Optional redirect on 401
    }
  };

  return (
    <Dialog open={!!message} onClose={handleClose}>
      <DialogTitle>{status === 401 ? 'Unauthorized' : 'Error'}</DialogTitle>
      <DialogContent>{status} : {message}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
