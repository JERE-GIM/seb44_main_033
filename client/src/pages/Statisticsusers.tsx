import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Options,
  Selectbox,
  StatisticTitle,
  StatisticsHeader,
  StyledChart,
  Wrapper,
} from './styles/Statisticsusers.styled';

const CHART_FIELD = {
  GENRE: 'Genre',
  GENRE_DATA: 'Preference Ratio',
};

const genders = ['Male', 'Female'];
const ages = ['10', '20', '30', '40', '50', '60'];

function Statisticsusers() {
  const [gender, setGender] = useState(genders[0]);
  const [age, setAge] = useState(ages[0]);
  const [data, setData] = useState([
    [CHART_FIELD.GENRE, CHART_FIELD.GENRE_DATA],
  ]);

  const options = {
    title: `Preference Ratio by Gender: ${gender} and Age Group: ${age}`,
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `http://cinemaprincess.shop/statistics/users?age=${age}&gender=${gender}`,
      )
      .then((res) => {
        setData([[CHART_FIELD.GENRE, CHART_FIELD.GENRE_DATA], ...res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [gender, age]);

  return (
    <Wrapper>
      <StatisticsHeader>
        <StatisticTitle>Statistics | Movie Genre Preference for</StatisticTitle>
        <Selectbox onChange={handleGenderChange} value={gender}>
          {genders.map((genderValue) => (
            <Options key={genderValue} value={genderValue}>
              {genderValue}
            </Options>
          ))}
        </Selectbox>
        <Selectbox onChange={handleAgeChange} value={age}>
          {ages.map((ageValue) => (
            <Options key={ageValue} value={ageValue}>
              {ageValue}
            </Options>
          ))}
        </Selectbox>
      </StatisticsHeader>
      <StyledChart chartType="Bar" data={data} options={options} />
    </Wrapper>
  );
}

export default Statisticsusers;
