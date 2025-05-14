// store/loadingSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  requestCount: 0
};

const LoadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading(state) {
      state.requestCount++;
      state.loading = true;
    },
    stopLoading(state) {
      state.requestCount = Math.max(state.requestCount - 1, 0);
      if (state.requestCount === 0) {
        state.loading = false;
      }
    }
  }
});

export const { startLoading, stopLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;
