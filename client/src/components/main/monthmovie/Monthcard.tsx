import React from 'react';
import {
  Container,
  Base,
  ImageWrapper,
  Image,
} from '../../styles/monthmovie/Monthcard';

interface Props {
  posterPath: string;
}

const MonthCard: React.FC<Props> = ({ posterPath }) => (
  <Container>
    <Base>
      <ImageWrapper>
        <Image src={`https://image.tmdb.org/t/p/w200/${posterPath}`} />
      </ImageWrapper>
    </Base>
  </Container>
);

export default MonthCard;
