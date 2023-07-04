import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 60px;
  border-bottom: 3px solid #f1c6d4;
  position: sticky;
  z-index: 1;
  padding: 0px 0px 0px 0px;
`;

const HeaderTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #6600cc;
  margin: 0;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-right: 20px;
`;

const Button = styled.button`
  background-color: #8000ff;
  color: white;
  border: none;
  padding: 6px 16px;
  font-size: 16px;
  font-weight: bold;
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
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>
        <LogoImage
          src={process.env.PUBLIC_URL + ' /images/Cinemalogo.png'}
          alt="Logo"
        />
        CINEMA PRINCESS
      </HeaderTitle>
      <ButtonContainer>
        <Button>로그인</Button>
        <Button>회원가입</Button>
        <Button>통계자료</Button>
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
