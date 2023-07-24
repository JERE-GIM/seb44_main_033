import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// 이달의 상영작

export interface Movie {
  movieId: number;
  posterPath: string;
}

export const fetchMonthly = createAsyncThunk(
  'monthly/fetchMonthly',
  async (_, { rejectWithValue }) => {
    const url = `${process.env.REACT_APP_BASE_URL}/movies/monthly`;
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
