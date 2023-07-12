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
  ModalContainer,
  ModalBackground,
} from '../styles/Header.styled';
import SignupForm1 from '../signup/SignupForm1'; // SignupForm1 컴포넌트 추가

export default function Header() {
  const isLoggedIn = useAppSelector((state: RootState) => state.isLogin);
  const dispatch = useAppDispatch();
  const [username, setusername] = useState('');
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    dispatch(login());
    navigate('/');
  };

  const handleLogout = () => {
    setusername('');
    dispatch(logout());
    navigate('/');
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
          <MypageContainer>
            <FontAwesomeIcon icon={faCircleUser} size="2x" />
            <MyPageId>{username}</MyPageId>
          </MypageContainer>
          <Button onClick={handleLogout}>로그아웃</Button>
          <Link to="/statistics">
            <Button>통계자료</Button>
          </Link>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <Button onClick={handleLogin}>로그인</Button>
          <Button onClick={handleSignupModalOpen}>회원가입</Button>
          <Link to="/statistics">
            <Button>통계자료</Button>
          </Link>
        </ButtonContainer>
      )}
      {/* 모달 */}
      {isSignupModalOpen && (
        <ModalBackground onClick={handleSignupModalClose}>
          <ModalContainer>
            <div className="modal-content">
              <SignupForm1 onClose={handleSignupModalClose} />
            </div>
          </ModalContainer>
        </ModalBackground>
      )}
    </HeaderContainer>
  );
}
