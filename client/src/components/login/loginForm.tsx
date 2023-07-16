import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setPassword } from '../../redux/reducers/singupSlice';
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
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    dispatch(setEmail(email));
    setIsEmailValid(isEmailValid);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    dispatch(setPassword(password));
    setIsPasswordValid(isPasswordValid);
  };

  const handleLogin = () => {
    const formData = {
      email,
      password,
    };

    axios
      .post('/login', formData)
      .then(() => {
        onClose();
        navigate('/');
      })
      .catch(() => {
        alert('로그인에 실패했습니다.');
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
