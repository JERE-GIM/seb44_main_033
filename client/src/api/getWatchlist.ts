import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAccessTokenAndUserId } from '../util/func';
// 와치리스트 불러오기

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
  async () => {
    const [accessToken, userId] = getAccessTokenAndUserId();
    const url = `${process.env.REACT_APP_BASE_URL}/users/mypage/watchlist/${userId}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: accessToken,
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
