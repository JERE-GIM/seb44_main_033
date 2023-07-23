import { styled } from 'styled-components';

export const MyReviewWrapper = styled.div``;

export const MyReviewContainer = styled.div`
  width: 100%;
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
