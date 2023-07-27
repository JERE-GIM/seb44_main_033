import { createSlice } from '@reduxjs/toolkit';
import { fetchWatchlist } from '../../api/getWatchlist';

const initialState = {
  status: 'loading',
  movies: [],
  error: null as string | null,
};
const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchUpcoming
      .addCase(fetchWatchlist.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.movies = action.payload.watchlistMovies;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string | null;
      });
  },
});

export default watchlistSlice;
