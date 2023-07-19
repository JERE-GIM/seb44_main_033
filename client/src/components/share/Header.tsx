import React from 'react';
import Searchbar from '../share/Searchbar';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
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
import SignupForm1 from '../signup/SignupForm1'; // SignupForm1 컴포넌트 추가
import LoginForm from '../login/loginForm'; // SignupForm1 컴포넌트 추가

export default function Header() {
  const isLoggedIn = useAppSelector((state: RootState) => state.isLogin);
  const dispatch = useAppDispatch();
  const [username, setusername] = useState('');
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setusername('');
    dispatch(logout());
    localStorage.removeItem('userId');
    navigate('/');
  };
  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true); // 모달 창 열기
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false); // 모달 창 닫기
  };

  const handleSignupModalOpen = () => {
    setIsSignupModalOpen(true); // 모달 창 열기
  };

  const handleSignupModalClose = () => {
    setIsSignupModalOpen(false); // 모달 창 닫기
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <HeaderTitle>
          <LogoImage
            src={process.env.PUBLIC_URL + '/images/Cinemalogo.png'}
            alt="Logo"
          />
          CINEMA PRINCESS
        </HeaderTitle>
      </Link>
      <Searchbar></Searchbar>
      {!isLoggedIn ? (
        <ButtonContainer>
          <Link to="/mypage">
            <MypageContainer>
              <FontAwesomeIcon icon={faCircleUser} size="2x" />
              <MyPageId>{username}</MyPageId>
            </MypageContainer>
          </Link>
          <Button onClick={handleLogout}>로그아웃</Button>
          <Link to="/watchlist">
            <Button>찜한 영화</Button>
          </Link>
          <Link to="/statistics">
            <Button>통계자료</Button>
          </Link>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <Button onClick={handleLoginModalOpen}>로그인</Button>
          <Button onClick={handleSignupModalOpen}>회원 가입</Button>
          <Link to="/statistics">
            <Button>통계자료</Button>
          </Link>
        </ButtonContainer>
      )}
      {isSignupModalOpen && <SignupForm1 onClose={handleSignupModalClose} />}
      {isLoginModalOpen && <LoginForm onClose={handleLoginModalClose} />}
    </HeaderContainer>
  );
}
