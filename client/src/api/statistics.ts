import axios from 'axios';

export const fetchGetStatisticsYearlyGenres = async (year: number) => {
  const res = await axios.get(`http://cinemaprincess.shop/genres?year=${year}`);
  return res;
};
