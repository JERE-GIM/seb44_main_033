// In searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSearch, Movie } from '../../api/getSearch';

interface SearchState {
  status: 'idle' | 'loading' | 'failed';
  data: Movie[];
}

const initialState: SearchState = {
  status: 'idle',
  data: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchSearch.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.status = 'idle';
          state.data = action.payload;
        },
      )
      .addCase(fetchSearch.rejected, (state) => {
        state.status = 'failed';
        state.data = [];
      });
  },
});

export default searchSlice;
