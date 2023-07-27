import { createSlice } from '@reduxjs/toolkit';
import { fetchUpcoming } from '../../api/getUpcoming';
import { fetchNew } from '../../api/getNew';
import { fetchPopular } from '../../api/getPopular';

const initialState = {
  status: 'loading',
  movies: [],
  error: null as string | null,
};
const tabmovieSlice = createSlice({
  name: 'tabmovie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchUpcoming
      .addCase(fetchUpcoming.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.movies = action.payload.data;
      })
      .addCase(fetchUpcoming.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string | null;
      })
      //fetchNew
      .addCase(fetchNew.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNew.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.movies = action.payload.data;
      })
      .addCase(fetchNew.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string | null;
      })
      //fetchPopulat
      .addCase(fetchPopular.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.movies = action.payload.data;
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string | null;
      });
  },
});

export default tabmovieSlice;
