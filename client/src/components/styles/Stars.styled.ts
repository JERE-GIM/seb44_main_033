import { styled } from 'styled-components';

export const Background = styled.div`
  width: fit-content;
  cursor: pointer;
`;

export const Star = styled.img`
  width: 32px;
  height: 32px;

  filter: invert(100%) sepia(2%) saturate(770%) hue-rotate(321deg)
    brightness(107%) contrast(74%);

  &:hover {
    filter: invert(95%) sepia(69%) saturate(6547%) hue-rotate(326deg)
      brightness(97%) contrast(107%);
  }
`;
