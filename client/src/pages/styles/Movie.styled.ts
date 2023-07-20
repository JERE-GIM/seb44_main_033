import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const MovieCover = styled.div`
  position: relative;
`;

export const MovieCoverImage = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: cover;
`;

export const MovieHeader = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 40px;
  color: white;
`;

export const MovieTitle = styled.h1`
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 20px;
`;

export const MovieDescription = styled.p`
  width: 50%;
  line-height: 25px;
  font-size: 18px;

  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const StarsContainer = styled.div`
  width: fit-content;
  position: absolute;
  left: 40px;
  bottom: 40px;
`;

export const AverageRatingContainer = styled.div`
  position: absolute;
  left: 220px;
  bottom: 40px;

  display: flex;
  align-items: center;
`;

export const Star = styled.img`
  width: 32px;
  height: 36px;
  filter: invert(15%) sepia(83%) saturate(7433%) hue-rotate(272deg)
    brightness(92%) contrast(127%);
`;

export const AverageRatingText = styled.div`
  margin-left: 5px;
`;

export const AverageRatingSpan = styled.span`
  color: white;

  &:first-child {
    font-size: 20px;
    font-weight: 700;
  }

  &:last-child {
    font-size: 15px;
    margin-left: 5px;
  }
`;

export const MovieDetail = styled.section`
  width: 1320px;
  display: flex;
  margin: 0 auto;
  padding-top: 20px;

  & > div:first-child {
    width: 280px;
  }
  & > div:last-child {
    margin-left: 20px;
    flex-grow: 1;
  }
`;

export const MovieDetailCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MoviePoster = styled.img`
  width: 280px;
`;

export const MovieReviews = styled.section`
  width: 1320px;
  margin: 0 auto;
  margin-top: 50px;
`;

export const MovieOTTInfo = styled.section`
  width: 1320px;
  margin: 0 auto;
  margin-top: 50px;
`;

export const OTTContainer = styled.div`
  display: inline-block;
  margin-right: 50px;
`;

export const OTTImage = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;

export const OTTText = styled(Link)`
  height: 32px;
  line-height: 32px;
  font-size: 20px;
  vertical-align: top;
  text-decoration: none;
  color: var(--black);
`;

export const MovieRecommend = styled.section`
  width: 1320px;
  margin: 0 auto;
  margin-top: 50px;
`;

export const RecommendList = styled.ul`
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(5, 1fr);
`;

export const RecommentListItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SectionTitle = styled.h2`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 20px;
`;
