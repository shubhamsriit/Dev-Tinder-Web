// errorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ErrorSlice = createSlice({
  name: 'error',
  initialState: { message: '', status: null },
  reducers: {
    setError: (state, action) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    clearError: (state) => {
      state.message = '';
      state.status = null;
    },
  },
});

export const { setError, clearError } = ErrorSlice.actions;
export default ErrorSlice.reducer;
