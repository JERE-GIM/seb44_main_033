import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// 와치리스트 불러오기

const BASE_URL = 'http://cinemaprincess.shop/';

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
  async (userId: number) => {
    const url = `${BASE_URL}users/mypage/watchlist/${userId}`;
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);

      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      return error;
    }
  },
);

const emptyObject = {};
export default emptyObject;
