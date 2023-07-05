import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { login, logout } from '../../redux/reducers/isLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import {
  HeaderContainer,
  HeaderTitle,
  LogoImage,
  ButtonContainer,
  Button,
  MypageContainer,
  MyPageId,
} from '../styles/Header.styled';

const Header: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLogin);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <HeaderContainer>
      <HeaderTitle>
        <LogoImage
          src={process.env.PUBLIC_URL + '/images/Cinemalogo.png'}
          alt="Logo"
        />
        CINEMA PRINCESS
      </HeaderTitle>
      {isLoggedIn ? (
        <ButtonContainer>
          <MypageContainer>
            <FontAwesomeIcon icon={faCircleUser} size="2x" />
            <MyPageId>닉네임몇글자까지할지모르겠네</MyPageId>
          </MypageContainer>
          <Button onClick={handleLogout}>로그아웃</Button>
          <Button>통계자료</Button>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <Button onClick={handleLogin}>로그인</Button>
          <Button>회원가입</Button>
          <Button>통계자료</Button>
        </ButtonContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
