import styled from 'styled-components';

export const BookmarkButton = styled.button<{
  $right: string;
  $bottom: string;
}>`
  position: absolute;
  bottom: ${({ $bottom }) => $bottom};
  right: ${({ $right }) => $right};
  background-color: transparent;
  border: none;
  color: #8000ff;
`;
