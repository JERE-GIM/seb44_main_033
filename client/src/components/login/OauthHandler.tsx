import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setAccessToken } from '../../redux/reducers/authSlice';
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

    if (accessToken) {
      params.delete('access_token');
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newUrl);

      dispatch(setAccessToken(accessToken));
      dispatch(login());
      localStorage.setItem('isLogin', 'true');

      try {
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
          throw new Error('Token expired');
        }
      } catch (error) {
        console.error('사용자 정보를 받아오는데 실패하였습니다:', error);
      }
    }
  }, [location, dispatch]);

  return null;
};
