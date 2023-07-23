import Chart from 'react-google-charts';
import { styled } from 'styled-components';

export const Wrapper = styled.section`
  width: 1320px;
  margin: 0 auto;
  height: calc(100vh - 260px);

  display: flex;
  flex-direction: column;
`;

export const StatisticsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
`;

export const StatisticTitle = styled.h1`
  font-size: 25px;
  font-weight: 600;
`;

export const Selectbox = styled.select`
  width: 100px;
  height: 40px;
  padding: 0 10px;
  margin-left: 10px;

  -webkit-appearance: none; /* for chrome */
  -moz-appearance: none; /*for firefox*/
  appearance: none;
  &::-ms-expand {
    display: none; /*for IE10,11*/
  }

  font-size: 20px;
  font-weight: 600;
  outline: none;
  border: 2px solid var(--gray-dark);
  border-radius: 10px;
`;

export const Options = styled.option``;

export const StyledChart = styled(Chart)`
  width: 100%;
  height: calc(100vh - 160px - 80px);
  max-height: 1000px;
`;
