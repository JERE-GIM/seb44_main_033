import { useEffect, useMemo, useState } from 'react';
// import { requestGetStatisticsYearlyGenres } from '../api/statistics';
import {
  Options,
  Selectbox,
  StatisticTitle,
  StatisticsHeader,
  StyledChart,
  Wrapper,
} from './styles/YearlyGenres.styled';

const CHART_FIELD = {
  GENRE: 'Genre',
  GENRE_DATA: 'Movies per Year',
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
    ['코믹', 1],
    ['액션', 6],
    ['로맨스', 5],
  ]);

  const options = {
    title: `Yearly Genres for ${year}`,
    pieHole: 0.4,
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  };

  useEffect(() => {
    /*    requestGetStatisticsYearlyGenres(year).then((res) =>
      setData([[CHART_FIELD.GENRE, CHART_FIELD.GENRE_DATA], ...res.data]),
    ); */
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
