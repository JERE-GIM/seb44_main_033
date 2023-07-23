import axios from 'axios';

const accessToken = localStorage.getItem('accessToken')
  ? localStorage.getItem('accessToken')
  : null;

export const fetchGetStatisticsYearlyGenres = async (year: number) => {
  const res = await axios.get(
    `http://cinemaprincess.shop/statistics/genres?year=${year}`,
    {
      headers: { Authorization: accessToken },
    },
  );
  return res;
};
