import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setAccessToken } from '../../redux/reducers/authSlice';

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
      dispatch(setAccessToken(accessToken));

      try {
        const decoded = jwt_decode(accessToken);
        const tokenPayload = decoded as TokenPayload;

        
        if (typeof tokenPayload.userId === 'string') {
          const userId = tokenPayload.userId;
          localStorage.setItem('userId', userId);
        } else {
          throw new Error('Invalid token payload');
        }

        // Check token expiry
        if (typeof tokenPayload.exp === 'number' && Date.now() >= tokenPayload.exp * 1000) {
          throw new Error('Token expired');
        }
      } catch (error) {
        console.error('사용자 정보를 받아오는데 실패하였습니다:', error);
        // Handle error for the user here
      }
    }
  }, [location, dispatch]);

  // This component only handles side effects, does not render any UI
  return null;
};
