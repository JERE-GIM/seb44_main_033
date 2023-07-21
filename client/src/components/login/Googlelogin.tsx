import React from 'react';
import { GoogleLogo } from '../styles/SignupForm1.styled';

const GOOGLE_OAUTH_URL = `http://cinemaprincess.shop/oauth2/authorization/google`;

const GoogleLogin: React.FC = () => {
  const handleLogin = () => {
    window.location.href = GOOGLE_OAUTH_URL;
    console.log('성공');
  };

  return (
    <GoogleLogo
      src={process.env.PUBLIC_URL + '/images/Google.png'}
      onClick={handleLogin}
    />
  );
};

export default GoogleLogin;
