import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchMovieRank, RankMovie } from '../../../api/getMovierank';
import Slider from './Slider';
import Card from './Card';
import { Base, Title } from '../../styles/rankmovie/Topmovie.styled';
// slide
// import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

export default function TopMovie() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movierank.movies);

  useEffect(() => {
    dispatch(fetchMovieRank({ page: 1, size: 10 }));
  }, []);
  return (
    <Base>
      <Title>박스 오피스 순위 </Title>
      <Slider>
        {movies.map((movie: RankMovie) => {
          return (
            <Link to={`/movie/${movie.movieId}`} key={movie.movieId}>
              <Card
                posterPath={movie.posterPath}
                movieNm={movie.movieNm}
                openDt={movie.openDt.split('-')[0]}
                audiAcc={movie.audiAcc}
                rank={movie.rank}
              />
            </Link>
          );
        })}
      </Slider>
    </Base>
  );
}
