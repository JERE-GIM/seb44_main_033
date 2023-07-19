import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// 이달의 상영작

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BASE_URL = 'http://cinemaprincess.shop/';

export interface Movie {
  movieId: number;
  posterPath: string;
}

export const fetchMonthly = createAsyncThunk(
  'monthly/fetchMonthly',
  async (_, { rejectWithValue }) => {
    const url = `${BASE_URL}movies/monthly`;
    const response = await axios.get(url);
    try {
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
