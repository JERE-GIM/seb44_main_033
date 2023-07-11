import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextPage,
  prevPage,
  setDisplayName,
  setEmail,
  setPassword,
  setGender,
  setAge,
  setGenre,
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
  const { currentPage, displayName, email, password, gender, age, genre } =
    useSelector((state: RootState) => state.signup);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleNext = () => {
    if (!isNicknameValid(displayName)) {
      // displayName이 유효하지 않은 경우 처리
      return;
    }
    if (!isEmailValid(email)) {
      // email이 유효하지 않은 경우 처리
      return;
    }
    if (!isPasswordValid(password)) {
      // password가 유효하지 않은 경우 처리
      return;
    }
    dispatch(nextPage());
  };
  const handlePrev = () => {
    dispatch(prevPage());
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
  const isNicknameValid = (nickname: string): boolean => {
    return nickname.trim() !== '' && nickname.length <= 12;
  };

  // 이메일 유효성 검사 함수
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== '' && emailRegex.test(email);
  };

  // 패스워드 유효성 검사 함수
  const isPasswordValid = (password: string): boolean => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}$/;
    return password.trim() !== '' && passwordRegex.test(password);
  };

  const handleGenderChange = (selectedGender: string) => {
    setSelectedGender(selectedGender);
    dispatch(setGender(selectedGender));
  };
  const handleAgeChange = (selectedAge: string) => {
    setSelectedAge(selectedAge);
    dispatch(setAge(selectedAge));
  };
  const handleGenreChange = (selectedGenre: string) => {
    setSelectedGenre(selectedGenre);
    dispatch(setGenre(selectedGenre));
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
              placeholder="DisplayName"
              onChange={handleDisplayNameChange}
            />
          </DisplayNameBox>
          <EmailBox>
            <EmailInput
              value={email}
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </EmailBox>
          <PasswordBox>
            <PasswordInput
              value={password}
              placeholder="Password"
              onChange={handlePasswordChange}
            />
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
          <AgeBox>
            <AgeTitle>나이</AgeTitle>
            <AgeBoxLabel>
              <GenderInput
                type="radio"
                name="age"
                value="10"
                checked={age === 'teens'}
                onChange={() => handleAgeChange('10대')}
              />
              <AgeText selected={selectedAge === '10대'}>10대</AgeText>
            </AgeBoxLabel>
            <AgeBoxLabel>
              <AgeInput
                type="radio"
                name="age"
                value="20"
                checked={age === 'twenties'}
                onChange={() => handleAgeChange('20대')}
              />
              <AgeText selected={selectedAge === '20대'}>20대</AgeText>
            </AgeBoxLabel>
          </AgeBox>
          <AgeBox>
            <AgeTitlebottom></AgeTitlebottom>
            <AgeBoxLabel>
              <AgeInput
                type="radio"
                name="age"
                value="30"
                checked={age === 'thirties'}
                onChange={() => handleAgeChange('30대')}
              />
              <AgeText selected={selectedAge === '30대'}>30대</AgeText>
            </AgeBoxLabel>
            <AgeBoxLabel>
              <AgeInput
                type="radio"
                name="age"
                value="40"
                checked={age === 'forties'}
                onChange={() => handleAgeChange('40대')}
              />
              <AgeText selected={selectedAge === '40대'}>40대</AgeText>
            </AgeBoxLabel>
          </AgeBox>
          <AgeBox>
            <AgeTitlebottom></AgeTitlebottom>
            <AgeBoxLabel>
              <AgeInput
                type="radio"
                name="age"
                value="50"
                checked={age === 'fifties'}
                onChange={() => handleAgeChange('50대')}
              />
              <AgeText selected={selectedAge === '50대'}>50대</AgeText>
            </AgeBoxLabel>
            <AgeBoxLabel>
              <GenderInput
                type="radio"
                name="age"
                value="60"
                checked={age === 'sixties'}
                onChange={() => handleAgeChange('60대')}
              />
              <AgeText selected={selectedAge === '60대'}>60대</AgeText>
            </AgeBoxLabel>
          </AgeBox>
          {/* 선호 장르 작업선 */}
          <GenreBox>
            <GenreTitle>선호 장르</GenreTitle>
            <GenreBoxLabel>
              <GenreInput
                type="radio"
                name="genre"
                value="액션"
                checked={genre === 'action'}
                onChange={() => handleGenreChange('액션')}
              />
              <GenreText selected={selectedGenre === '액션'}>액션</GenreText>
            </GenreBoxLabel>
            <GenreBoxLabel>
              <GenreInput
                type="radio"
                name="genre"
                value="판타지"
                checked={genre === 'fantasy'}
                onChange={() => handleGenreChange('판타지')}
              />
              <GenreText selected={selectedGenre === '판타지'}>
                판타지
              </GenreText>
            </GenreBoxLabel>
            <GenreBoxLabel>
              <GenreInput
                type="radio"
                name="genre"
                value="만화"
                checked={genre === 'animation'}
                onChange={() => handleGenreChange('만화')}
              />
              <GenreText selected={selectedGenre === '만화'}>만화</GenreText>
            </GenreBoxLabel>
          </GenreBox>
          <GenreBox>
            <GenreTitlebottom></GenreTitlebottom>
            <GenreBoxLabel>
              <GenreInput
                type="radio"
                name="genre"
                value="멜로"
                checked={genre === 'melo'}
                onChange={() => handleGenreChange('멜로')}
              />
              <GenreText selected={selectedGenre === '멜로'}>멜 로</GenreText>
            </GenreBoxLabel>
            <GenreBoxLabel>
              <GenreInput
                type="radio"
                name="genre"
                value="로맨스"
                checked={genre === 'romance'}
                onChange={() => handleGenreChange('로맨스')}
              />
              <GenreText selected={selectedGenre === '로맨스'}>
                로맨스
              </GenreText>
            </GenreBoxLabel>
            <GenreBoxLabel>
              <GenreInput
                type="radio"
                name="genre"
                value="공포"
                checked={genre === 'horror'}
                onChange={() => handleGenreChange('공포')}
              />
              <GenreText selected={selectedGenre === '공포'}>공 포</GenreText>
            </GenreBoxLabel>
          </GenreBox>
          <GenreBox>
            <GenreTitlebottom></GenreTitlebottom>
            <GenreBoxLabel>
              <GenreInput
                type="radio"
                name="genre"
                value="코미디"
                checked={genre === 'comedy'}
                onChange={() => handleGenreChange('코미디')}
              />
              <GenreText selected={selectedGenre === '코미디'}>
                코미디
              </GenreText>
            </GenreBoxLabel>
            <GenreBoxLabel>
              <GenreInput
                type="radio"
                name="genre"
                value="다큐"
                checked={genre === 'Documentary'}
                onChange={() => handleGenreChange('다큐')}
              />
              <GenreText selected={selectedGenre === '다큐'}>다 큐</GenreText>
            </GenreBoxLabel>
            <GenreBoxLabel>
              <GenreInput
                type="radio"
                name="genre"
                value="기타"
                checked={genre === 'null'}
                onChange={() => handleGenreChange('기타')}
              />
              <GenreText selected={selectedGenre === '기타'}>기 타</GenreText>
            </GenreBoxLabel>
          </GenreBox>
          <MessageBox>
            <SignupButton2 onClick={handlePrev}>이 전</SignupButton2>
            <SignupButton2>확 인</SignupButton2>
          </MessageBox>
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

export const AgeBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 345px;
`;

export const AgeTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 50px;
`;

export const AgeBoxLabel = styled.label`
  display: flex;
  align-items: center;
  width: 90px;
`;

export const AgeText = styled.span<{ selected: boolean }>`
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

export const AgeInput = styled.input`
  display: none;

  &:checked + ${AgeText} {
    background: #765aaf;
    color: #fff;
  }
`;
export const AgeTitlebottom = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 57px;
  margin-right: 50px;
`;

export const GenreBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 345px;
`;

export const GenreTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: 27px;
`;

export const GenreBoxLabel = styled.label`
  display: flex;
  align-items: center;
  width: 90px;
  margin-right: -20px;
`;

export const GenreText = styled.span<{ selected: boolean }>`
  font-size: 14px;
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

export const GenreInput = styled.input`
  display: none;

  &:checked + ${AgeText} {
    background: #765aaf;
    color: #fff;
  }
`;
export const GenreTitlebottom = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 57px;
  margin-right: 50px;
`;
export const MessageBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
export const SignupButton2 = styled.button`
  background-color: #8000ff;
  width: 100px;
  height: 40px;
  color: white;
  border: none;
  padding: 6px 16px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  margin: 20px 20px 0px 20px;
  &:active {
    background-color: #6600cc;
  }
`;
