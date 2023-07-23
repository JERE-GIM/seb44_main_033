import React from 'react';
import {
  Container,
  Base,
  ImageWrapper,
  Image,
  Info,
  Title,
  Keyword,
  Ranking,
} from '../../styles/rankmovie/Card.styled';

interface Props {
  rank?: number;
  movieNm: string;
  openDt?: string;
  posterPath: string;
  audiAcc?: number;
}

const Card: React.FC<Props> = ({
  rank,
  movieNm,
  openDt,
  posterPath,
  audiAcc,
}) => {
  //만명 단위로 끊기
  const formatAudiAcc = (count?: number) => {
    if (count === undefined) return '누적 관객수 정보 없음';
    if (count >= 10000) {
      const unit = '만명';
      const formattedCount = (count / 10000).toFixed(0);
      return `${formattedCount}${unit}`;
    }
    return count;
  };
  return (
    <div style={{ position: 'relative' }}>
      <Container>
        <Base>
          <ImageWrapper>
            <Image src={`https://image.tmdb.org/t/p/w200/${posterPath}`} />
          </ImageWrapper>
          <Info>
            <Title>{movieNm}</Title>
            <Keyword>{openDt}</Keyword>
            <Keyword>누적관객 {formatAudiAcc(audiAcc)}</Keyword>
            <Ranking>{rank}</Ranking>
          </Info>
        </Base>
      </Container>
    </div>
  );
};

export default Card;
