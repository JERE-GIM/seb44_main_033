import React from 'react';
import { ITop, dummyTopMovie } from '../../../dummy/dummyTop';
import Slider from './Slider';
import Card from './Card';
import { Base, Title } from '../../styles/rankmovie/Topmovie.styled';
// slide
// import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TopMovieSlider: React.FC = () => {
  return (
    <Base>
      <Title>박스 오피스 순위 </Title>
      <Slider>
        {dummyTopMovie.map((movie: ITop) => {
          return (
            <Card
              key={movie.id}
              poster={movie.poster}
              title={movie.title}
              openat={movie.openat}
              country={movie.country}
            />
          );
        })}
      </Slider>
    </Base>
  );
};

export default TopMovieSlider;
