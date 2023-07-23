import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchMonthly, Movie } from '../../../api/getMonthly';
import { RightBase } from '../../styles/tabmovie/Botmovie.styled';
import { Title } from '../../styles/monthmovie/Monthmovie';
import MonthSlider from './Monthslider';
import MonthCard from './Monthcard';

export default function MonthMovie() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.monthly.movies);

  useEffect(() => {
    dispatch(fetchMonthly());
  }, []);
  return (
    <RightBase>
      <Title>7월 상영작</Title>
      <MonthSlider>
        {movies.map((movie: Movie) => {
          return (
            <MonthCard key={movie.movieId} posterPath={movie.posterPath} />
          );
        })}
      </MonthSlider>
    </RightBase>
  );
}
