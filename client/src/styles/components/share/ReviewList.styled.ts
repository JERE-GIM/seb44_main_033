import { styled } from 'styled-components';
import { NextButton, PrevButton } from '../main/rankmovie/Slider.styled';

export const ReviewListWrapper = styled.ul`
  .slick-active:not(:first-child) {
    padding-left: 10px;
  }
`;

export const NonSlider = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

export const PrevButtonTransformed = styled(PrevButton)`
  transform: translate(-50%, 100%);
`;

export const NextButtonTransformed = styled(NextButton)`
  transform: translate(50%, 100%);
`;
