import { styled } from 'styled-components';
interface StyledHeaderProps {
  isMovieDetailPage: boolean;
}
export const StyledRoot = styled.div<StyledHeaderProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  padding-top: ${(props) => (props.isMovieDetailPage ? '0px' : '80px')};
`;

export const Header = styled.div`
  position: fixed;
  padding-top: 80px;
`;
export const Footer = styled.div`
  transform: translateY(-100%);
  height: 100px;
  position: relative;
`;
