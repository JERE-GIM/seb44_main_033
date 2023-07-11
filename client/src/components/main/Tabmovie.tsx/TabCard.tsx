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
  poster: string;
  title: string;
  openat: number;
  country: string;
}

const Card: React.FC<Props> = ({ poster, title, country, openat }) => (
  <Container>
    <Base>
      <ImageWrapper>
        <Image src={poster} alt={`${title} 의 포스터`} />
      </ImageWrapper>
      <Info>
        <Title>{title}</Title>
        <Keyword>{openat}</Keyword>
        <Keyword>{country}</Keyword>
      </Info>
    </Base>
  </Container>
);

export default Card;
