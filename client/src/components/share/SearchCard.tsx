import React from 'react';
import {
  Container,
  Base,
  ImageWrapper,
  Image,
  Info,
  Title,
} from '../../styles/components/main/rankmovie/Card.styled';
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
            src={`${process.env.REACT_APP_IMAGE_BASE_URL}/w500/${posterPath}`}
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
