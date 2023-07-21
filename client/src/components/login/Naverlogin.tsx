import React from 'react';
import { NaverLogo } from '../styles/SignupForm1.styled';

const NAVER_OAUTH_URL = `http://cinemaprincess.shop/oauth2/authorization/naver`;

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
