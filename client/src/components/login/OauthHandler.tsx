import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import {
  setAccessToken,
  setRefreshToken,
} from '../../redux/reducers/authSlice';
import { login } from '../../redux/reducers/isLogin';

interface TokenPayload {
  userId: string;
  exp?: number;
}

export const OauthHandler: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (!accessToken || !refreshToken) {
      console.error('Access token or Refresh token is missing');
      return;
    }

    params.delete('access_token');
    params.delete('refresh_token');
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);

    try {
      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
      dispatch(login());
      localStorage.setItem('isLogin', 'true');
      const decoded = jwt_decode(accessToken);
      const tokenPayload = decoded as TokenPayload;
      if (typeof tokenPayload.userId === 'string') {
        const userId = tokenPayload.userId;
        localStorage.setItem('userId', userId);
      } else {
        throw new Error('Invalid token payload');
      }

      if (
        typeof tokenPayload.exp === 'number' &&
        Date.now() >= tokenPayload.exp * 1000
      ) {
        // 억세스 토큰 새로받는 로직 추가해야함
        throw new Error('Token expired');
      }
    } catch (error) {
      console.error('Failed to process the user information:', error);
    }
  }, [location, dispatch]);

  return null;
};
