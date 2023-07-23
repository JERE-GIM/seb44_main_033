import axios from 'axios';
import { getAccessTokenAndUserId } from '../util/func';

export const fetchGetStatisticsYearlyGenres = async (year: number) => {
  const [accessToken] = getAccessTokenAndUserId();
  const res = await axios.get(
    `http://cinemaprincess.shop/statistics/genres?year=${year}`,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
};
