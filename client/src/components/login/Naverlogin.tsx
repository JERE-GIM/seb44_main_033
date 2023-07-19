import React from 'react';
import { NaverLogo } from '../styles/SignupForm1.styled';

// 네이버 로그인 요청 URL을 만듭니다.
const NAVER_OAUTH_URL = `http://ec2-54-180-99-202.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/naver`;

const NaverLogin: React.FC = () => {
  // NaverLogo 컴포넌트를 클릭하면, 네이버 로그인 요청 URL로 이동하도록 합니다.
  const handleLogin = () => {
    window.location.href = NAVER_OAUTH_URL;
  };

  return (
    <NaverLogo
      src={process.env.PUBLIC_URL + '/images/Naver.png'}
      onClick={handleLogin}
    />
  );
};

export default NaverLogin;
