import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Searchbar from '../share/Searchbar';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/reducers/isLogin';
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
  const isLoggedIn = useAppSelector((state: RootState) => state.isLogin.status);
  const dispatch = useAppDispatch();
  const [username, setusername] = useState('');
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMovieDetailPage = location.pathname.includes('/movie/');
  const [isAtTop, setIsAtTop] = useState(true);
  const handleLogout = () => {
    setusername('');
    dispatch(logout());
    localStorage.removeItem('isLogin');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate('/');
  };
  useEffect(() => {
    const onScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
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
    <HeaderContainer isMovieDetailPage={isMovieDetailPage && isAtTop}>
      <Link to="/">
        <HeaderTitle isMovieDetailPage={isMovieDetailPage && isAtTop}>
          <LogoImage
            src={process.env.PUBLIC_URL + '/images/logo.png'}
            alt="Logo"
          />
          CINEMA PRINCESS
        </HeaderTitle>
      </Link>
      <Searchbar></Searchbar>
      {isLoggedIn ? (
        <ButtonContainer isMovieDetailPage={isMovieDetailPage && isAtTop}>
          <Link to="/mypage">
            <MypageContainer isMovieDetailPage={isMovieDetailPage && isAtTop}>
              <FontAwesomeIcon icon={faCircleUser} size="2x" />
              <MyPageId>{username}</MyPageId>
            </MypageContainer>
          </Link>
          <Button
            isMovieDetailPage={isMovieDetailPage && isAtTop}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
          <Link to="/watchlist">
            <Button isMovieDetailPage={isMovieDetailPage && isAtTop}>
              찜한 영화
            </Button>
          </Link>
          <Link to="/statistics">
            <Button isMovieDetailPage={isMovieDetailPage && isAtTop}>
              통계자료
            </Button>
          </Link>
        </ButtonContainer>
      ) : (
        <ButtonContainer isMovieDetailPage={isMovieDetailPage && isAtTop}>
          <Button
            isMovieDetailPage={isMovieDetailPage && isAtTop}
            onClick={handleLoginModalOpen}
          >
            로그인
          </Button>
          <Button
            isMovieDetailPage={isMovieDetailPage && isAtTop}
            onClick={handleSignupModalOpen}
          >
            회원 가입
          </Button>
          <Link to="/statistics">
            <Button isMovieDetailPage={isMovieDetailPage && isAtTop}>
              통계자료
            </Button>
          </Link>
        </ButtonContainer>
      )}
      {isSignupModalOpen && <SignupForm1 onClose={handleSignupModalClose} />}
      {isLoginModalOpen && <LoginForm onClose={handleLoginModalClose} />}
    </HeaderContainer>
  );
}
