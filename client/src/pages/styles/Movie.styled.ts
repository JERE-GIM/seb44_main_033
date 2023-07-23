import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const MovieCover = styled.div`
  position: relative;
  height: 50vh;

  &:after {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(transparent, var(--black-80a));
  }
`;

export const MovieCoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MovieHeader = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  padding: 0 40px;
  color: white;

  z-index: var(--z-index-1);
`;

export const MovieTitle = styled.h1`
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 20px;

  text-shadow: 1px 1px 2px var(--black-80a);
`;

export const MovieDescription = styled.p`
  width: 50%;
  line-height: 25px;
  font-size: 18px;

  text-shadow: 1px 1px 1px var(--black-80a);
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const MovieCoverBottom = styled.div`
  width: 100%;
  padding: 0 40px;
  position: absolute;
  bottom: 40px;
  display: flex;
  justify-content: space-between;
  color: white;

  z-index: var(--z-index-1);
`;

export const UserController = styled.div``;

export const StarsContainer = styled.div`
  width: fit-content;
  padding-right: 60px;
`;

export const AverageRatingContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Star = styled.img`
  width: 40px;
  height: 40px;

  filter: invert(15%) sepia(83%) saturate(7433%) hue-rotate(272deg)
    brightness(92%) contrast(127%);
`;

export const AverageRatingText = styled.div`
  margin-left: 10px;
`;

export const AverageRatingSpan = styled.span`
  color: white;
  text-shadow: 1px 1px 1px var(--black-80a);

  &:first-child {
    font-size: 25px;
    font-weight: 700;
  }

  &:last-child {
    font-size: 20px;
    margin-left: 5px;
  }
`;

export const MovieDetail = styled.section`
  width: 1320px;
  display: flex;
  margin: 0 auto;
  padding-top: 30px;

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

export const MovieVideo = styled.section`
  width: 1320px;
  margin: 0 auto;
  margin-top: 50px;
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

export const RecommentListItemLink = styled(Link)``;

export const SectionTitle = styled.h2`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 20px;
`;
