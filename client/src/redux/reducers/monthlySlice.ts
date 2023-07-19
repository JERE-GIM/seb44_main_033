import { createSlice } from '@reduxjs/toolkit';
import { fetchMonthly } from '../../api/getMonthly';

const initialState = {
  status: 'loading',
  movies: [],
  error: null as string | null,
};
const monthlySlice = createSlice({
  name: 'monthly',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchMonthly
      .addCase(fetchMonthly.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMonthly.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.movies = action.payload.data;
      })
      .addCase(fetchMonthly.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string | null;
      });
  },
});

export default monthlySlice;
