import React from 'react';
import { KakaoLogo } from '../styles/SignupForm1.styled';

// 카카오 로그인 요청 URL을 만듭니다.
const KAKAO_OAUTH_URL = `http://ec2-54-180-99-202.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao`;

const KakaoLogin: React.FC = () => {
  // KakaoLogo 컴포넌트를 클릭하면, 카카오 로그인 요청 URL로 이동하도록 합니다.
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
