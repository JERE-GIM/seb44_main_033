import { useEffect, useMemo, useState } from 'react';
import {
  Options,
  Selectbox,
  StatisticTitle,
  StatisticsHeader,
  StyledChart,
  Wrapper,
} from './styles/YearlyGenres.styled';
import { fetchGetStatisticsYearlyGenres } from '../api/statistics';

const CHART_FIELD = {
  GENRE: 'Genre',
  GENRE_DATA: 'Released Movie Genres per Year',
};

function YearlyGenres() {
  const thisYear = useMemo(() => new Date().getFullYear(), []);
  const yearList = useMemo(
    () => Array.from({ length: thisYear - 1970 + 1 }, (v, i) => 1970 + i),
    [],
  );

  const [year, setYear] = useState(thisYear);
  const [data, setData] = useState([
    [CHART_FIELD.GENRE, CHART_FIELD.GENRE_DATA],
  ]);

  const options = {
    title: `Released Movie Genres for ${year}`,
    pieHole: 0.4,
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  };

  const handleFetchGetStatisticsYearlyGenres = () => {
    fetchGetStatisticsYearlyGenres(year)
      .then((res) => {
        const newData = [[CHART_FIELD.GENRE, CHART_FIELD.GENRE_DATA]];
        Object.keys(res.data).forEach((genreName) =>
          newData.push([genreName, res.data[genreName]]),
        );
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleFetchGetStatisticsYearlyGenres();
  }, [year]);

  return (
    <Wrapper>
      <StatisticsHeader>
        <StatisticTitle>Statistics | Released Movie Genre for</StatisticTitle>
        <Selectbox onChange={handleChangeSelect} value={year}>
          {yearList.map((yearValue) => (
            <Options key={yearValue} value={yearValue}>
              {yearValue}
            </Options>
          ))}
        </Selectbox>
      </StatisticsHeader>
      <StyledChart chartType="PieChart" data={data} options={options} />
    </Wrapper>
  );
}

export default YearlyGenres;
