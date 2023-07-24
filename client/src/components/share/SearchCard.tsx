import React from 'react';
import {
  Container,
  Base,
  ImageWrapper,
  Image,
  Info,
  Title,
} from '../../components/styles/rankmovie/Card.styled';
import { Link } from 'react-router-dom';
interface Props {
  movieId: number;
  title: string;
  posterPath: string;
}
const SearchCard: React.FC<Props> = ({ movieId, posterPath, title }) => (
  <Container>
    <Base>
      <ImageWrapper>
        <Link to={`/movie/${movieId}`} key={movieId}>
          <Image
            src={`https://image.tmdb.org/t/p/w200/${posterPath}`}
            alt="movie poster"
          />
        </Link>
      </ImageWrapper>
      <Info>
        <Title>{title}</Title>
      </Info>
    </Base>
  </Container>
);

export default SearchCard;
