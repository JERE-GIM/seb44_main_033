import axios from 'axios';

export const requestGetStatisticsYearlyGenres = async (year: number) => {
  const res = await axios.get(`http://cinemaprincess.shop/genres?year=${year}`);
  return res;
};
