import { styled } from 'styled-components';
export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 60px;
  border-bottom: 3px solid #f1c6d4;
  position: sticky;
  top: 0;
  padding: 0px 0px 0px 0px;
  background-color: white;
  a {
    text-decoration-line: none;
`;

export const HeaderTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #6600cc;
  margin: 0;
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 500px;
`;

export const LogoImage = styled.img`
  width: 55px;
  height: 55px;
  margin-right: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 490px;
  padding-right: 20px;
`;

export const Button = styled.button`
  background-color: #8000ff;
  color: white;
  border: none;
  padding: 6px 16px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 8px;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  &:first-child {
    margin-left: 0;
  }
  &:not(:last-child) {
    margin-right: 20px;
  }
  &:active {
    background-color: #6600cc;
  }
`;
export const MypageContainer = styled.button`
  background-color: white;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 57px;
  padding: 0 10px;
  cursor: pointer;
`;
export const MyPageId = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #8000ff;
  border: none;
  background: none;
  margin: 5px 20px 5px 5px;
`;
