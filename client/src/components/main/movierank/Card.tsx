import React from 'react';
import {
  Container,
  Base,
  ImageWrapper,
  Image,
  Info,
  Title,
  Keyword,
  Average,
} from '../../styles/rankmovie/Card.styled';
import { AiFillStar } from 'react-icons/ai';

interface Props {
  poster: string;
  title: string;
  openat: number;
  country: string;
  voteAverage: number;
}

const Card: React.FC<Props> = ({
  poster,
  title,
  country,
  openat,
  voteAverage,
}) => (
  <Container>
    <Base>
      <ImageWrapper>
        <Image src={poster} alt={`${title} 의 포스터`} />
      </ImageWrapper>
      <Info>
        <Title>{title}</Title>
        <Keyword>{openat}</Keyword>
        <Keyword>{country}</Keyword>
        <Average>
          <AiFillStar />
          <span>{voteAverage}</span>
        </Average>
      </Info>
    </Base>
  </Container>
);

export default Card;
