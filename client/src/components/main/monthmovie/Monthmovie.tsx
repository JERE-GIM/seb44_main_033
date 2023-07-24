import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchMonthly, Movie } from '../../../api/getMonthly';
import { RightBase } from '../../styles/tabmovie/Botmovie.styled';
import { Title } from '../../styles/monthmovie/Monthmovie';
import MonthSlider from './Monthslider';
import MonthCard from './Monthcard';
import { Link } from 'react-router-dom';

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
            <Link to={`/movie/${movie.movieId}`} key={movie.movieId}>
              <MonthCard posterPath={movie.posterPath} />
            </Link>
          );
        })}
      </MonthSlider>
    </RightBase>
  );
}
