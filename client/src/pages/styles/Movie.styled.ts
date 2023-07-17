import { styled } from 'styled-components';
import {
  NextButton,
  PrevButton,
} from '../../components/styles/rankmovie/Slider.styled';

export const MovieCover = styled.div`
  position: relative;
`;

export const MovieCoverImage = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: cover;
`;

export const MovieTitle = styled.h1`
  position: absolute;
  top: 50%;
  left: 40px;
  font-size: 40px;
  font-weight: 800;
  color: white;
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
  max-width: 1320px;
  display: flex;
  margin: 0 auto;
  padding-top: 20px;

  & > div:first-child {
    width: 280px;
    background-color: navy;
  }
  & > div:last-child {
    flex-grow: 1;
    margin-left: 20px;
  }
`;

export const MovieDetailCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MoviePoster = styled.img`
  width: 280px;
`;

export const MovieInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 0 20px;
  flex-grow: 1;
`;

export const MovieInfoContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const MovieInfoCol = styled.div`
  flex-grow: 1;
`;

export const MovieInfoText = styled.div`
  width: fit-content;
  height: 25px;
`;

export const MovieInfoSpan = styled.span`
  &:first-child {
    color: var(--gray-deep);
    margin-right: 10px;
  }
`;

export const MyReviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  background-color: #f7f8ff;
  font-weight: 500;
`;

export const MyReviewContent = styled.p`
  margin-right: 10px;
  line-height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const MyReviewRegisterButton = styled.button`
  width: fit-content;
  padding: 10px 40px;
  border: 1px solid var(--gray-dark);
  border-radius: 6px;
  background-color: white;
  font-weight: 500;
`;

export const MyReviewButtons = styled.div`
  flex-shrink: 0;
`;

export const MyReviewControlButton = styled.button`
  width: fit-content;
  border: none;
  background-color: transparent;
  color: var(--gray-deep);
  font-weight: 500;

  &:hover {
    font-weight: 600;
  }

  &:last-child {
    margin-left: 10px;
  }
`;

export const MovieReviews = styled.section`
  max-width: 1320px;
  margin: 0 auto;
  margin-top: 20px;
`;

export const ReviewList = styled.ul`
  .slick-active:not(:first-child) {
    padding-left: 10px;
  }
`;

export const PrevButtonTransformed = styled(PrevButton)`
  transform: translate(-50%, 100%);
`;

export const NextButtonTransformed = styled(NextButton)`
  transform: translate(50%, 100%);
`;

export const MovieRecommend = styled.section`
  width: 1320px;
  margin: 0 auto;
  padding-top: 20px;
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
