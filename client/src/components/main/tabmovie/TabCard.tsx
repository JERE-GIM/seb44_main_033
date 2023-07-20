import React from 'react';
import {
  Container,
  Base,
  ImageWrapper,
  Image,
  Info,
  Title,
  Keyword,
} from '../../styles/tabmovie/Tabcard.styled';

interface Props {
  posterPath: string;
  title: string;
  releaseDate: string;
}

const TabCard: React.FC<Props> = ({ posterPath, title, releaseDate }) => (
  <Container>
    <Base>
      <ImageWrapper>
        <Image src={`https://image.tmdb.org/t/p/w200/${posterPath}`} />
      </ImageWrapper>
      <Info>
        <Title>{title}</Title>
        <Keyword>{releaseDate}</Keyword>
      </Info>
    </Base>
  </Container>
);

export default TabCard;
