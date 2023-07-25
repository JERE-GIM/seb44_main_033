import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducers/isLogin';

function OAuthHandler() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      dispatch(login());
    }
  }, [location, dispatch]);

  return <div>Processing login...</div>;
}

export default OAuthHandler;

// '로그인 요청 후 리다이렉트되는 페이지'
