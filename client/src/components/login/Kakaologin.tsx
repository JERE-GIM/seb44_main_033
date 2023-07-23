import React from 'react';
import { KakaoLogo } from '../styles/SignupForm1.styled';

const KAKAO_OAUTH_URL = `http://cinemaprincess.shop/oauth2/authorization/kakao`;

const KakaoLogin: React.FC = () => {
  const handleLogin = () => {
    window.location.href = KAKAO_OAUTH_URL;
  };

  return (
    <KakaoLogo
      src={process.env.PUBLIC_URL + '/images/Kakao.png'}
      onClick={handleLogin}
    />
  );
};

export default KakaoLogin;
