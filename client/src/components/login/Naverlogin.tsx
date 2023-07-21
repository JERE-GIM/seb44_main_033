import React from 'react';
import { NaverLogo } from '../styles/SignupForm1.styled';

const NAVER_OAUTH_URL = `http://ec2-54-180-99-202.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/naver`;

const NaverLogin: React.FC = () => {
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
