import { styled } from 'styled-components';

export const Background = styled.div`
  width: fit-content;
  cursor: pointer;
`;

export const Label = styled.label``;

export const RadioButton = styled.input`
  display: none;
`;

export const Star = styled.img<{ $rated: boolean }>`
  width: 20px;
  height: 40px;
  cursor: pointer;

  filter: ${(props) =>
    props.$rated
      ? 'invert(88%) sepia(62%) saturate(1415%) hue-rotate(326deg) brightness(98%) contrast(104%)'
      : 'invert(100%) sepia(0%) saturate(1511%) hue-rotate(63deg) brightness(75%) contrast(104%)'}; // #c4c4c4

  &:hover {
    filter: invert(95%) sepia(69%) saturate(6547%) hue-rotate(326deg)
      brightness(97%) contrast(107%);
  }
`;

export const ReversedStar = styled(Star)`
  transform: scaleX(-1);
`;
