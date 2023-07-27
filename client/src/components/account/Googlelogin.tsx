import React from 'react';
import { GoogleLogo } from '../../styles/components/account/SignupForm1.styled';

const GOOGLE_OAUTH_URL = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/google`;

const GoogleLogin: React.FC = () => {
  const handleLogin = () => {
    window.location.href = GOOGLE_OAUTH_URL;
  };

  return (
    <GoogleLogo
      src={process.env.PUBLIC_URL + '/images/Google.png'}
      onClick={handleLogin}
    />
  );
};

export default GoogleLogin;
