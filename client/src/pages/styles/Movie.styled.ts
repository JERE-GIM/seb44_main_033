import { styled } from 'styled-components';

export const StarsContainer = styled.div`
  width: fit-content;
`;

export const MovieCover = styled.div``;

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

export const ReviewList = styled.section``;
