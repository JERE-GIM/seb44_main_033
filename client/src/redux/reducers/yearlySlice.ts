import { createSlice } from '@reduxjs/toolkit';
import { fetchYearly } from '../../api/getMonthly';

const initialState = {
  status: 'loading',
  movies: [],
  error: null as string | null,
};
const yearlySlice = createSlice({
  name: 'yearly',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchMonthly
      .addCase(fetchYearly.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchYearly.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.movies = action.payload.data;
      })
      .addCase(fetchYearly.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string | null;
      });
  },
});

export default yearlySlice;
