import { createSlice } from '@reduxjs/toolkit';
import { fetchMovieRank } from '../../api/getMovierank';

const initialState = {
  status: 'loading',
  movies: [],
  error: null as string | null,
};
const movierankSlice = createSlice({
  name: 'movierank',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchMovieRank
      .addCase(fetchMovieRank.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovieRank.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.movies = action.payload.content;
      })
      .addCase(fetchMovieRank.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string | null;
      });
  },
});

export default movierankSlice;
