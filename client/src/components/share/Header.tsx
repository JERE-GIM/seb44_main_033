import React from 'react';
import Searchbar from '../share/Searchbar';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
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
interface Header {
  username: string;
}

export default function Header() {
  const isLoggedIn = useAppSelector((state: RootState) => state.isLogin);
  const dispatch = useAppDispatch();
  const [username, setusername] = useState('');

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    setusername('');
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
      <Searchbar></Searchbar>
      {isLoggedIn ? (
        <ButtonContainer>
          <MypageContainer>
            <FontAwesomeIcon icon={faCircleUser} size="2x" />
            <MyPageId>{username}</MyPageId>
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
}
