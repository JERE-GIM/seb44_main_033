import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setPassword } from '../../redux/reducers/singupSlice';
import { setAccessToken } from '../../redux/reducers/authSlice';
import {
  ModalBackground,
  ModalContainer,
  LogoTitle,
  SubTitle,
  EmailBox,
  EmailInput,
  PasswordBox,
  PasswordInput,
  LoginButton,
  SignupmessageBox,
  Signupmessage,
  Signuplink,
  OAuthbox,
} from '../styles/LoginForm.styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import jwt_decode from 'jwt-decode';
import NaverLogin from './Naverlogin';
import KakaoLogin from './Kakaologin';
import GoogleLogin from './Googlelogin';
import { login } from '../../redux/reducers/isLogin';

const LoginForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state: RootState) => state.signup);
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // 이메일
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== '' && emailRegex.test(email);
  };

  // 비번
  const isPasswordValid = (password: string): boolean => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9\s]).{8,20}$/;
    return password.trim() !== '' && passwordRegex.test(password);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    dispatch(setEmail(email));
    isEmailValid(email);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    dispatch(setPassword(password));
    isPasswordValid(password);
  };

  const handleLogin = () => {
    const formData = {
      email,
      password,
    };
    if (!isEmailValid(email)) {
      alert('아이디를 확인해주세요.');
      return;
    }

    if (!isPasswordValid(password)) {
      alert('비밀번호를 확인해주세요.');
      return;
    }
    axios
      .post(
        'http://cinemaprincess.shop/login',
        formData,
      )
      .then((response) => {
        console.log(response.headers);
        const accessToken = response.headers.authorization;
        if (!accessToken) {
          console.error('토큰이 제공되지 않았습니다.');
          return;
        }
        dispatch(setAccessToken(accessToken));
        dispatch(login());
        localStorage.setItem('isLogin', 'true');
        const userId = UserIdFromAccessToken(accessToken);
        if (!userId) {
          alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
          navigate('/login');
          return;
        }
        
        localStorage.setItem('userId', userId);
        localStorage.setItem('accessToken', accessToken); // accessToken 저장
        onClose();
        navigate('/');
      })
      .catch(() => {
        alert('아이디와 비밀번호를 확인해주세요');
        });
    };

    interface TokenPayload {
      userId: number;
      exp?: number;
    }
    
    const UserIdFromAccessToken = (accessToken: string): string => {
      try {
        const decoded = jwt_decode(accessToken);
        const tokenPayload = decoded as TokenPayload;
    
        // Check if the object has userId property and it is a number
        if (typeof tokenPayload.userId === 'number') {
          const userId = tokenPayload.userId;
          // Check token expiry
          if (typeof tokenPayload.exp === 'number' && Date.now() >= tokenPayload.exp * 1000) {
            throw new Error('Token expired');
          }
          return userId.toString();
        } else {
          throw new Error('Invalid token payload');
        }
      } catch (error) {
        console.error('토큰 디코딩에 실패했습니다:', error);
        console.error('잘못된 토큰:', accessToken);
        return '';
      }
    };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer ref={modalRef} onClick={handleModalClick}>
        <LogoTitle>CINEMA PRINCESS</LogoTitle>
        <SubTitle>Login</SubTitle>
        <EmailBox>
          <EmailInput placeholder="Email" onChange={handleEmailChange} />
        </EmailBox>
        <PasswordBox>
          <PasswordInput
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </PasswordBox>
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
        <SignupmessageBox>
          <Signupmessage>Don&apos;t have an account?</Signupmessage>
          <Signuplink>Click Sign up</Signuplink>
        </SignupmessageBox>
        <div>or</div>
        <OAuthbox>
          <KakaoLogin />
          <NaverLogin />
          <GoogleLogin />
        </OAuthbox>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LoginForm;
