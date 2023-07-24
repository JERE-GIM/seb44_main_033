import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// 박스오피스 순위

export interface RankMovie {
  rank: number;
  movieNm: string;
  openDt: string;
  audiAcc: number;
  posterPath: string;
  movieId: number;
}

export const fetchMovieRank = createAsyncThunk(
  'movierank/fetchMovieRank',
  async ({ page, size }: { page: number; size: number }) => {
    const url = `${process.env.REACT_APP_BASE_URL}/movieRank?page=${page}&size=${size}`;
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
