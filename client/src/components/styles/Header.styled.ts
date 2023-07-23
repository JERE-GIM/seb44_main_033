import { styled } from 'styled-components';
interface HeaderContainerProps {
  isMovieDetailPage: boolean;
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 60px;
  border-bottom: 3px solid #f1c6d4;
  position: fixed;
  z-index: 1;
  top: 0;
  padding: 0px 0px 0px 0px;
  background-color: white;
  ${({ isMovieDetailPage }) =>
    isMovieDetailPage &&
    `
    position: fixed;
    border-bottom: 0px solid #f1c6d4;
    background-color: transparent;
    `}
  a {
    text-decoration-line: none;
  }
`;

export const HeaderTitle = styled.h1<HeaderContainerProps>`
  font-size: 36px;
  font-weight: 700;
  color: #6600cc;
  margin: 0;
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 500px;
  ${({ isMovieDetailPage }) =>
    isMovieDetailPage &&
    `
     color: white;
     background-color: transparent; 
    `}
`;

export const LogoImage = styled.img`
  width: 55px;
  height: 55px;
  margin-right: 8px;
  background-color: transparent;
`;

export const ButtonContainer = styled.div<HeaderContainerProps>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 490px;
  margin-left: 30px;
  margin-right: 20px;
`;

export const Button = styled.button<HeaderContainerProps>`
  background-color: #8000ff;
  color: white;
  border: 1px solid white;
  padding: 6px 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  margin-left: 10px;
  ${({ isMovieDetailPage }) =>
    isMovieDetailPage &&
    `
     border: 1px solid white;
     color: #939393;
     background-color: transparent; 
    `}
  &:active {
    background-color: #6600cc;
  }
`;
export const MypageContainer = styled.button<HeaderContainerProps>`
  background-color: white;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 57px;
  padding: 0 0px;
  cursor: pointer;
  ${({ isMovieDetailPage }) =>
    isMovieDetailPage &&
    `
   color: black;
   background-color: transparent; 
  `}
`;
export const MyPageId = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #8000ff;
  border: none;
  background: none;
  margin: 5px 20px 5px 5px;
`;
