import axios from 'axios';
import { getAccessTokenAndUserId } from '../util/func';

export const fetchGetStatisticsYearlyGenres = async (year: number) => {
  const [accessToken] = getAccessTokenAndUserId();
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/statistics/genres?year=${year}`,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
};

export const fetchGetStatisticsusers = async (age: number, gender: string) => {
  const [accessToken] = getAccessTokenAndUserId();
  const res = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/statistics/users?age=${age}gender=${gender}`,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
};
