import axios from 'axios';

const accessToken = localStorage.getItem('accessToken')
  ? localStorage.getItem('accessToken')
  : null;
const userId = localStorage.getItem('userId')
  ? Number(localStorage.getItem('userId'))
  : null;

export const fetchGetMovieInfo = async (movieId: number) => {
  const res = await axios.get(`http://cinemaprincess.shop/movies/${movieId}`);
  return res;
}; //

export const fetchGetMyReview = async (movieId: number) => {
  const res = await axios.get(
    `http://cinemaprincess.shop/reviews/${movieId}/${userId}`,
    {
      headers: { Authorization: accessToken },
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
export const fetchCreateMyReview = async (data: ICreateMyReviewData) => {
  data = { ...data, userId };

  const res = await axios.post(`http://cinemaprincess.shop/reviews`, data, {
    headers: { Authorization: accessToken },
  });
  return res;
}; //

interface IUpdateReviewData {
  content: string;
  score: number;
}
export const fetchUpdateMyReview = async (
  reviewId: number,
  data: IUpdateReviewData,
) => {
  const res = await axios.patch(
    `http://cinemaprincess.shop/reviews/${reviewId}`,
    data,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
}; //

export const fetchDeleteMyReview = async (reviewId: number) => {
  const res = await axios.delete(
    `http://cinemaprincess.shop/reviews/${reviewId}`,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
}; //

export const fetchAddToWatchlist = async (movieId: number) => {
  const res = await axios.post(
    `http://cinemaprincess.shop/movies/${movieId}/${userId}`,
    null,
    { headers: { Authorization: accessToken } },
  );
  return res;
};

export const fetchDeleteInWatchlist = async (movieId: number) => {
  const res = await axios.post(
    `http://cinemaprincess.shop/movies/${movieId}/${userId}`,
    null,
    { headers: { Authorization: accessToken } },
  );
  return res;
};
