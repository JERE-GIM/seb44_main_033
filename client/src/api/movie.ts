import axios from 'axios';
import { getAccessTokenAndUserId } from '../util/func';

export const fetchGetMovieInfo = async (movieId: number) => {
  const res = await axios.get(`http://cinemaprincess.shop/movies/${movieId}`);
  return res;
};

export const fetchGetMovieInfoLoggedIn = async (movieId: number) => {
  const [accessToken, userId] = getAccessTokenAndUserId();
  const res = await axios.get(
    `http://cinemaprincess.shop/movies/${movieId}/${userId}`,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
};

export const fetchGetMyReview = async (movieId: number) => {
  const [accessToken, userId] = getAccessTokenAndUserId();
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
}
export const fetchCreateMyReview = async (data: ICreateMyReviewData) => {
  const [accessToken, userId] = getAccessTokenAndUserId();
  const newData = { ...data, userId };

  const res = await axios.post(`http://cinemaprincess.shop/reviews`, newData, {
    headers: { Authorization: accessToken },
  });
  return res;
};

interface IUpdateReviewData {
  content: string;
  score: number;
}
export const fetchUpdateMyReview = async (
  reviewId: number,
  data: IUpdateReviewData,
) => {
  const [accessToken] = getAccessTokenAndUserId();
  const res = await axios.patch(
    `http://cinemaprincess.shop/reviews/${reviewId}`,
    data,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
};

export const fetchDeleteMyReview = async (reviewId: number) => {
  const [accessToken] = getAccessTokenAndUserId();
  const res = await axios.delete(
    `http://cinemaprincess.shop/reviews/${reviewId}`,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
};

export const fetchAddToWatchlist = async (movieId: number) => {
  const [accessToken, userId] = getAccessTokenAndUserId();
  const res = await axios.post(
    `http://cinemaprincess.shop/movies/${movieId}/${userId}`,
    null,
    { headers: { Authorization: accessToken } },
  );
  return res;
};

export const fetchDeleteInWatchlist = async (movieId: number) => {
  const [accessToken, userId] = getAccessTokenAndUserId();
  const res = await axios.delete(
    `http://cinemaprincess.shop/movies/${movieId}/${userId}`,
    { headers: { Authorization: accessToken } },
  );
  return res;
};

export const fetchLikeReview = async (reviewId: number) => {
  const [accessToken, userId] = getAccessTokenAndUserId();
  const res = await axios.post(
    `http://cinemaprincess.shop/reviews/votes/${reviewId}/${userId}`,
    null,
    { headers: { Authorization: accessToken } },
  );
  return res;
};

export const fetchUnlikeReview = async (reviewId: number) => {
  const [accessToken, userId] = getAccessTokenAndUserId();
  const res = await axios.post(
    `http://cinemaprincess.shop/reviews/votes/cancel/${reviewId}/${userId}`,
    null,
    { headers: { Authorization: accessToken } },
  );
  return res;
};
