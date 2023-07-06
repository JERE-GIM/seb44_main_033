import { styled } from 'styled-components';

export const StyledStarsContainer = styled.div`
  width: fit-content;
`;

export const StyledMovieCover = styled.div``;

export const StyledMovieDetail = styled.section`
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

export const StyledMovieDetailCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledMoviePoster = styled.img`
  width: 280px;
`;

export const StyledMovieInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 0 20px;
  flex-grow: 1;
`;

export const StyledMovieInfoContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const StyledMovieInfoCol = styled.div`
  flex-grow: 1;
`;

export const StyledMovieInfoText = styled.div`
  width: fit-content;
  height: 25px;
`;

export const StyledMovieInfoSpan = styled.span`
  &:first-child {
    color: #b0b0b0;
    margin-right: 10px;
  }
`;

export const StyledMyReviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  background-color: #f7f8ff;
  font-weight: 500;
`;
export const StyledMyReviewContent = styled.p`
  margin-right: 10px;
  line-height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
export const StyledMyReviewRegisterButton = styled.button`
  width: fit-content;
  padding: 10px 40px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: white;
  font-weight: 500;
`;
export const StyledMyReviewButtons = styled.div`
  flex-shrink: 0;
`;
export const StyledMyReviewControlButton = styled.button`
  width: fit-content;
  border: none;
  background-color: transparent;
  color: #b0b0b0;
  font-weight: 500;

  &:hover {
    font-weight: 700;
  }

  &:last-child {
    margin-left: 10px;
  }
`;

export const StyledReviewList = styled.section``;
