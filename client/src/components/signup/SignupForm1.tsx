import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextPage,
  setDisplayName,
  setEmail,
  setPassword,
  setGender,
  setAge,
} from '../../redux/reducers/singupSlice';
import { styled } from 'styled-components';
import {
  Container,
  Container1page,
  LogoTitle,
  SubTitle,
  DisplayNameBox,
  DisplayNameInput,
  EmailBox,
  EmailInput,
  PasswordBox,
  PasswordInput,
  SignupButton,
  LoginmessageBox,
  Loginmessage,
  Loginlink,
  OAuthbox,
  KakaoLogo,
  NaverLogo,
  GoogleLogo,
} from '../styles/SignupForm1.styled';
import { RootState } from '../../redux/store';

const SignupForm1: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, displayName, email, password, gender, age } =
    useSelector((state: RootState) => state.signup);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const handleNext = () => {
    dispatch(nextPage());
  };

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDisplayName(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };
  const handleGenderChange = (selectedGender: string) => {
    setSelectedGender(selectedGender);
    dispatch(setGender(selectedGender));
  };
  const handleAgeChange = (selectedAge: string) => {
    setSelectedAge(selectedAge);
    dispatch(setAge(selectedAge));
  };
  return (
    <Container>
      {currentPage === 1 && (
        <Container1page>
          <LogoTitle>CINEMA PRINCESS</LogoTitle>
          <SubTitle>Sign up</SubTitle>
          <DisplayNameBox>
            <DisplayNameInput
              value={displayName}
              onChange={handleDisplayNameChange}
            />
          </DisplayNameBox>
          <EmailBox>
            <EmailInput value={email} onChange={handleEmailChange} />
          </EmailBox>
          <PasswordBox>
            <PasswordInput value={password} onChange={handlePasswordChange} />
          </PasswordBox>
          <SignupButton onClick={handleNext}>다 음</SignupButton>
          <LoginmessageBox>
            <Loginmessage>Already haver an account?</Loginmessage>
            <Loginlink>Login</Loginlink>
          </LoginmessageBox>
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
        </Container1page>
      )}
      {currentPage === 2 && (
        <Container2page>
          <UserInfoTitle>User님의 회원정보</UserInfoTitle>
          <GenderBox>
            <GenderTitle>성별</GenderTitle>
            <GenderBoxLabel>
              <GenderInput
                type="radio"
                name="gender"
                value="남자"
                checked={gender === 'male'}
                onChange={() => handleGenderChange('남자')}
              />
              <GenderText selected={selectedGender === '남자'}>남자</GenderText>
            </GenderBoxLabel>
            <GenderBoxLabel>
              <GenderInput
                type="radio"
                name="gender"
                value="여자"
                checked={gender === 'female'}
                onChange={() => handleGenderChange('여자')}
              />
              <GenderText selected={selectedGender === '여자'}>여자</GenderText>
            </GenderBoxLabel>
          </GenderBox>
          <GenderBox>
            <GenderTitle>나이</GenderTitle>
            <GenderBoxLabel>
              <GenderInput
                type="radio"
                name="age"
                value="10"
                checked={age === '10'}
                onChange={() => handleAgeChange('10대')}
              />
              <GenderText selected={selectedAge === 'teens'}>10대</GenderText>
            </GenderBoxLabel>
            <GenderBoxLabel>
              <GenderInput
                type="radio"
                name="age"
                value="20"
                checked={age === '20'}
                onChange={() => handleAgeChange('20대')}
              />
              <GenderText selected={selectedAge === 'twenties'}>
                20대
              </GenderText>
            </GenderBoxLabel>
          </GenderBox>
          <GenderBox>
            <GenderTitle>나이</GenderTitle>
            <GenderBoxLabel>
              <GenderInput
                type="radio"
                name="age"
                value="30"
                checked={age === '30'}
                onChange={() => handleAgeChange('30대')}
              />
              <GenderText selected={selectedAge === 'thirties'}>
                30대
              </GenderText>
            </GenderBoxLabel>
            <GenderBoxLabel>
              <GenderInput
                type="radio"
                name="age"
                value="40"
                checked={age === '40'}
                onChange={() => handleAgeChange('40대')}
              />
              <GenderText selected={selectedAge === 'forties'}>40대</GenderText>
            </GenderBoxLabel>
          </GenderBox>
          <GenderBox>
            <GenderTitle>나이</GenderTitle>
            <GenderBoxLabel>
              <GenderInput
                type="radio"
                name="age"
                value="50"
                checked={age === '50'}
                onChange={() => handleAgeChange('50대')}
              />
              <GenderText selected={selectedAge === 'fifties'}>50대</GenderText>
            </GenderBoxLabel>
            <GenderBoxLabel>
              <GenderInput
                type="radio"
                name="age"
                value="60"
                checked={age === '60'}
                onChange={() => handleAgeChange('60대')}
              />
              <GenderText selected={selectedAge === 'sixties'}>60대</GenderText>
            </GenderBoxLabel>
          </GenderBox>
        </Container2page>
      )}
    </Container>
  );
};

export default SignupForm1;

export const Container2page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const UserInfoTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: #765aaf;
  margin-top: 40px;
`;
export const GenderBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 345px;
`;

export const GenderTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 50px;
`;

export const GenderBoxLabel = styled.label`
  display: flex;
  align-items: center;
  width: 90px;
`;

export const GenderText = styled.span<{ selected: boolean }>`
  font-size: 16px;
  width: 65px;
  height: 30px;
  background: ${({ selected }) => (selected ? '#b366ff' : 'lightgray')};
  border-radius: 50px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ selected }) => (selected ? 'white' : 'black')};

  &:hover {
    background: #b366ff;
    color: white;
  }
`;

export const GenderInput = styled.input`
  display: none;

  &:checked + ${GenderText} {
    background: #765aaf;
    color: #fff;
  }
`;
