import React from 'react';
import {
  Container,
  Base,
  ImageWrapper,
  Image,
} from '../../../styles/components/main/monthmovie/Monthcard';

interface Props {
  posterPath: string;
}

const MonthCard: React.FC<Props> = ({ posterPath }) => (
  <Container>
    <Base>
      <ImageWrapper>
        <Image
          src={`${process.env.REACT_APP_IMAGE_BASE_URL}/w200/${posterPath}`}
        />
      </ImageWrapper>
    </Base>
  </Container>
);

export default MonthCard;
