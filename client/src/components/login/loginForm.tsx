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
  KakaoLogo,
  NaverLogo,
  GoogleLogo,
} from '../styles/LoginForm.styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

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
      .post('/login', formData)
      .then((response) => {
        const accessToken = response.data.accessToken;
        dispatch(setAccessToken(accessToken));

        localStorage.setItem('userId', accessToken);

        onClose();
        navigate('/');
      })
      .catch(() => {
        alert('아이디와 비밀번호를 확인해주세요.');
      });
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
          <Signuplink>Sign up</Signuplink>
        </SignupmessageBox>
        <div>or</div>
        <OAuthbox>
          <KakaoLogo
            src={process.env.PUBLIC_URL + '/images/Kakao.png'}
            alt="Kakao"
          />
          <NaverLogo
            src={process.env.PUBLIC_URL + '/images/Naver.png'}
            alt="Naver"
          />
          <GoogleLogo
            src={process.env.PUBLIC_URL + '/images/Google.png'}
            alt="Google"
          />
        </OAuthbox>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LoginForm;
