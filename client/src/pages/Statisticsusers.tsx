import { useEffect, useState } from 'react';
import {
  Selectbox,
  StatisticTitle,
  StatisticsHeader,
  StyledChart,
  Wrapper,
} from './styles/Statisticsusers.styled';
import { fetchGetStatisticsusers } from '../api/statistics';

const CHART_FIELD = {
  GENRE: 'Genre',
  GENRE_DATA: 'Preferred Genres by Age and Gender',
};

function Statisticsusers() {
  const [age, setAge] = useState(10);
  const [gender, setGender] = useState('male');
  const [data, setData] = useState([
    [CHART_FIELD.GENRE, CHART_FIELD.GENRE_DATA],
  ]);

  const options = {
    title: `Preferred Movie Genres by Age and Gender`,
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(Number(event.target.value));
  };

  const handleFetchGetStatisticsusers = () => {
    fetchGetStatisticsusers(age, gender)
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
    handleFetchGetStatisticsusers();
  }, [gender, age]);

  return (
    <Wrapper>
      <StatisticsHeader>
        <StatisticTitle>
          Statistics | Preferred Movie Genre by Age and Gender
        </StatisticTitle>
        <Selectbox onChange={handleGenderChange} value={gender}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Selectbox>
        <Selectbox onChange={handleAgeChange} value={age}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
        </Selectbox>
      </StatisticsHeader>
      <StyledChart chartType="Bar" data={data} options={options} />
    </Wrapper>
  );
}

export default Statisticsusers;
