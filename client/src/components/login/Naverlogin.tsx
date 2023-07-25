import React from 'react';
import { NaverLogo } from '../../styles/components/account/SignupForm1.styled';

const NAVER_OAUTH_URL = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/naver`;

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
