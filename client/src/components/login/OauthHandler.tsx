import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setAccessToken } from '../../redux/reducers/authSlice';

interface TokenPayload {
  userId: string;
}

export const OauthHandler: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access_token');

    if (accessToken) {
      dispatch(setAccessToken(accessToken));

      try {
        const tokenPayload: TokenPayload = jwt_decode(accessToken);
        const userId = tokenPayload.userId;
        localStorage.setItem('userId', userId);
      } catch (error) {
        console.error('사용자 정보를 받아오는데 실패하였습니다:', error);
      }
    }
  }, [location, dispatch]);

  return null;
};
