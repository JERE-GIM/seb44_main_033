import { styled } from 'styled-components';

export const MovieInfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  margin-top: 40px;
  padding: 0 20px;
`;

export const MovieInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MovieInfoText = styled.div`
  width: fit-content;
  height: 30px;
`;

export const MovieInfoSpan = styled.span`
  &:first-child {
    color: var(--gray-deep);
    margin-right: 10px;
  }
`;
