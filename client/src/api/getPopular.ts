import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// 인기 영화 탭 부분

export interface Movie {
  movieId: number;
  posterPath: string;
  title: string;
  releaseDate: string;
}

export const fetchPopular = createAsyncThunk(
  'popular/fetchPopular',
  async (_, { rejectWithValue }) => {
    const url = `${process.env.REACT_APP_BASE_URL}/movies/popular`;
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
