import { styled } from 'styled-components';

export const MovieInfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 0 20px;
`;

export const MovieInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
