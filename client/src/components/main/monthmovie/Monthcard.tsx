import React from 'react';
import {
  Container,
  Base,
  ImageWrapper,
  Image,
} from '../../styles/monthmovie/Monthcard';

interface Props {
  poster: string;
}

const MonthCard: React.FC<Props> = ({ poster }) => (
  <Container>
    <Base>
      <ImageWrapper>
        <Image src={poster} alt="포스터" />
      </ImageWrapper>
    </Base>
  </Container>
);

export default MonthCard;
