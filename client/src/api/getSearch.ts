import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://cinemaprincess.shop/';

export interface Movie {
  movieId: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  country: string;
  voteAverage: number;
}

export const fetchSearch = createAsyncThunk(
  'search/fetchSearch',
  async (
    { keyword, page, size }: { keyword: string; page: number; size: number },
    { rejectWithValue },
  ) => {
    const url = `${BASE_URL}search?keyword=${keyword}&page=${page}&size=${size}`;
    try {
      const response = await axios.get(url);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const emptyObject = {};
export default emptyObject;
