import { IMovieInfo } from '../../types/movie';
import {
  MovieInfoContainer,
  MovieInfoSpan,
  MovieInfoText,
  MovieInfoWrapper,
} from '../styles/MovieInfo.styled';

interface IMovieInfoProps {
  movieInfo: IMovieInfo;
}

function MovieInfo({ movieInfo }: IMovieInfoProps) {
  return (
    <MovieInfoWrapper>
      <MovieInfoContainer>
        <MovieInfoText>
          <MovieInfoSpan>개봉</MovieInfoSpan>
          <MovieInfoSpan>{`${movieInfo.releaseDate.slice(
            0,
            4,
          )}년 ${movieInfo.releaseDate.slice(
            5,
            7,
          )}월 ${movieInfo.releaseDate.slice(8, 10)}일`}</MovieInfoSpan>
        </MovieInfoText>
        <MovieInfoText>
          <MovieInfoSpan>장르</MovieInfoSpan>
          <MovieInfoSpan>
            {movieInfo.genres.map((genre) => genre.genreName).join(', ')}
          </MovieInfoSpan>
        </MovieInfoText>
        <MovieInfoText>
          <MovieInfoSpan>등급</MovieInfoSpan>
          <MovieInfoSpan>
            {movieInfo.certification === ''
              ? '미정'
              : movieInfo.certification === 'All'
              ? '전체'
              : `${movieInfo.certification}세`}
          </MovieInfoSpan>
        </MovieInfoText>
        <MovieInfoText>
          <MovieInfoSpan>러닝타임</MovieInfoSpan>
          <MovieInfoSpan>{movieInfo.runtime}분</MovieInfoSpan>
        </MovieInfoText>
        <MovieInfoText>
          <MovieInfoSpan>감독</MovieInfoSpan>
          <MovieInfoSpan>{movieInfo.director}</MovieInfoSpan>
        </MovieInfoText>
        <MovieInfoText>
          <MovieInfoSpan>출연</MovieInfoSpan>
          <MovieInfoSpan>{movieInfo.actors}</MovieInfoSpan>
        </MovieInfoText>
      </MovieInfoContainer>
    </MovieInfoWrapper>
  );
}

export default MovieInfo;
