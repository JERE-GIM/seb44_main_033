import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// 와치리스트 불러오기

const BASE_URL = process.env.REACT_APP_API_URL;

export interface WatchMovie {
  watchlistId: string;
  movieId: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  createdAt: string;
}

export const fetchWatchlist = createAsyncThunk(
  'watchlist/fetchWatchlist',
  async (user_id) => {
    const url = `${BASE_URL}/users/mypage/watchlist/${user_id}`;
    const token = localStorage.getItem('jwtToken');

    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });

    try {
      if (response.status >= 200 && response.status < 300) return response.data;
    } catch (error) {
      return error;
    }
  },
);

const emptyObject = {};
export default emptyObject;
