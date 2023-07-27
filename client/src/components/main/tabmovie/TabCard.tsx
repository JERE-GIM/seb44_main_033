import React from 'react';
import {
  Container,
  Base,
  ImageWrapper,
  Image,
  Info,
  Title,
  Keyword,
} from '../../../styles/components/main/tabmovie/Tabcard.styled';

interface Props {
  posterPath: string;
  title: string;
  releaseDate: string;
}

const TabCard: React.FC<Props> = ({ posterPath, title, releaseDate }) => (
  <Container>
    <Base>
      <ImageWrapper>
        <Image
          src={`${process.env.REACT_APP_IMAGE_BASE_URL}/w500/${posterPath}`}
        />
      </ImageWrapper>
      <Info>
        <Title>{title}</Title>
        <Keyword>{releaseDate}</Keyword>
      </Info>
    </Base>
  </Container>
);

export default TabCard;
