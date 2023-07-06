import { styled } from 'styled-components';

export const StyledStarsContainer = styled.div`
  width: fit-content;
`;

export const StyledMovieCover = styled.div``;

export const StyledMovieInfo = styled.section``;

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
