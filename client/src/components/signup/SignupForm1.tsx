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
  Container2page,
  UserInfoTitle,
  GenderBox,
  GenderTitle,
  GenderBoxLabel,
  GenderText,
  GenderInput,
  AgeBox,
  AgeTitle,
  AgeBoxLabel,
  AgeText,
  AgeInput,
  AgeTitlebottom,
  GenreBox,
  GenreTitle,
  GenreBoxLabel,
  GenreText,
  GenreInput,
  GenreTitlebottom,
  MessageBox,
  Alertmessage,
  SignupButton2,
} from '../styles/SignupForm1.styled';
import { RootState } from '../../redux/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm1: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, displayName, email, password, gender, age, genre } =
    useSelector((state: RootState) => state.signup);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isConfirmValid, setIsConfirmValid] = useState(false);
  // 닉네임 유효성 검사 함수
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

  const handleNext = () => {
    if (!isNicknameValid(displayName)) {
      alert('닉네임은 공백없이 한글, 영문, 숫자만 입력 가능합니다.'); // displayName이 유효하지 않은 경우 처리
      return;
    }
    if (!isEmailValid(email)) {
      alert('이메일 형식이 올바르지 않습니다.'); // email이 유효하지 않은 경우 처리
      return;
    }
    if (!isPasswordValid(password)) {
      alert(
        '비밀번호는 숫자, 영문, 특수문자를 1자 이상 혼합하여 8-20자리 입력해주세요.',
      ); // password가 유효하지 않은 경우 처리
      return;
    }
    dispatch(nextPage());
  };

  const handlePrev = () => {
    dispatch(prevPage());
  };
  const navigate = useNavigate();
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
    validateConfirm();
  };

  const handleAgeChange = (selectedAge: string) => {
    setSelectedAge(selectedAge);
    dispatch(setAge(selectedAge));
    validateConfirm();
  };

  const handleGenreChange = (selectedGenre: string) => {
    setSelectedGenre(selectedGenre);
    dispatch(setGenre(selectedGenre));
    validateConfirm();
  };

  const validateConfirm = () => {
    const isValid =
      selectedGender !== null && selectedAge !== null && selectedGenre !== null;
    setIsConfirmValid(isValid);
  };
  const handleConfirm = () => {
    const formData = {
      displayName,
      email,
      password,
      gender,
      age,
      genre,
    };

    axios
      .post('/users/signup', formData) //주소
      .then((response) => {
        navigate('/');
      })
      .catch((error) => {
        alert('필수 사항을 모두 체크해주세요');
      });
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
          <Alertmessage>⚠️ 필수로 한가지씩 체크해주세요</Alertmessage>
          <MessageBox>
            <SignupButton2 onClick={handlePrev}>이 전</SignupButton2>
            <SignupButton2 disabled={!isConfirmValid} onClick={handleConfirm}>
              확 인
            </SignupButton2>
          </MessageBox>
        </Container2page>
      )}
    </Container>
  );
};

export default SignupForm1;
