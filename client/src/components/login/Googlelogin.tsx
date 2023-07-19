import React from 'react';
import { GoogleLogo } from '../styles/SignupForm1.styled';

// 구글 로그인 요청 URL을 만듭니다.
const GOOGLE_OAUTH_URL = `http://ec2-54-180-99-202.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google`;

const GoogleLogin: React.FC = () => {
  // GoogleLogo 컴포넌트를 클릭하면, 구글 로그인 요청 URL로 이동하도록 합니다.
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
