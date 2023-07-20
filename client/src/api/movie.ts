import axios from 'axios';

const accessToken = localStorage.getItem('accessToken')
  ? localStorage.getItem('accessToken')
  : null;
const userId = localStorage.getItem('userId')
  ? Number(localStorage.getItem('userId'))
  : null;

export const requestGetMovieInfo = async (movieId: number) => {
  const res = await axios.get(`http://cinemaprincess.shop/movies/${movieId}`);
  return res;
}; //

export const requestGetMyReview = async (movieId: number) => {
  const res = await axios.get(
    `http://cinemaprincess.shop/reviews/${movieId}/${userId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return res;
};

interface ICreateMyReviewData {
  content: string;
  score: number;
  movieId: number;
  userId?: number | null;
}
export const requestCreateMyReview = async (data: ICreateMyReviewData) => {
  data = { ...data, userId };

  const res = await axios.post(`http://cinemaprincess.shop/reviews`, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res;
}; //

interface IUpdateReviewData {
  content: string;
  score: number;
}
export const requestUpdateMyReview = async (
  reviewId: number,
  data: IUpdateReviewData,
) => {
  const res = await axios.patch(
    `http://cinemaprincess.shop/reviews/${reviewId}`,
    data,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return res;
}; //

export const requestDeleteMyReview = async (reviewId: number) => {
  const res = await axios.delete(
    `http://cinemaprincess.shop/reviews/${reviewId}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return res;
}; //

export const requestAddWatchlist = async (movieId: number) => {
  const res = await axios.post(
    `http://cinemaprincess.shop/movies/${movieId}/${userId}`,
    null,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return res;
};

export const requestDeleteWatchlist = async (movieId: number) => {
  const res = await axios.post(
    `http://cinemaprincess.shop/movies/${movieId}/${userId}`,
    null,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return res;
};
