import { styled } from 'styled-components';

export const Background = styled.div`
  width: fit-content;
`;

export const Label = styled.label``;

export const RadioButton = styled.input`
  display: none;
`;

export const Star = styled.img<{ $rated: boolean }>`
  width: 10px;
  height: 20px;

  filter: ${(props) =>
    props.$rated
      ? 'invert(88%) sepia(62%) saturate(1415%) hue-rotate(326deg) brightness(98%) contrast(104%)'
      : 'invert(99%) sepia(99%) saturate(37%) hue-rotate(191deg) brightness(111%) contrast(92%)'}; // #f5f5f5
`;

export const ReversedStar = styled(Star)`
  transform: scaleX(-1);
`;
