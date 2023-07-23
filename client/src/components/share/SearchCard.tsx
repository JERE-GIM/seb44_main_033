import React from 'react';
import {
  Container,
  Base,
  ImageWrapper,
  Image,
  Info,
  Title,
} from '../../components/styles/rankmovie/Card.styled';

interface Props {
  title: string;
  posterPath: string;
}

const SearchCard: React.FC<Props> = ({ posterPath, title }) => (
  <Container>
    <Base>
      <ImageWrapper>
        <Image
          src={`https://image.tmdb.org/t/p/w200/${posterPath}`}
          alt="movie poster"
        />
      </ImageWrapper>
      <Info>
        <Title>{title}</Title>
      </Info>
    </Base>
  </Container>
);

export default SearchCard;
