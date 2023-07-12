import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextPage,
  prevPage,
  setDisplayName,
  setEmail,
  setPassword,
  setGender,
  setAge,
  setGenres,
} from '../../redux/reducers/singupSlice';
import {
  ModalBackground,
  ModalContainer,
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
const SignupForm1: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { currentPage, displayName, email, password, gender, age, genres } =
    useSelector((state: RootState) => state.signup);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isConfirmValid, setIsConfirmValid] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null); // 모달 참조를 생성합니다.
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 모달 창 내부를 클릭했을 때에는 모달 창이 닫히지 않도록 합니다.
    e.stopPropagation();
  };
  // 닉네임
  const isNicknameValid = (nickname: string): boolean => {
    return nickname.trim() !== '' && nickname.length <= 12;
  };

  // 이메일
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== '' && emailRegex.test(email);
  };

  // 비번
  const isPasswordValid = (password: string): boolean => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}$/;
    return password.trim() !== '' && passwordRegex.test(password);
  };

  const handleNext = () => {
    if (!isNicknameValid(displayName)) {
      alert('닉네임은 공백없이 한글, 영문, 숫자만 입력 가능합니다.');
      return;
    }
    if (!isEmailValid(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    if (!isPasswordValid(password)) {
      alert(
        '비밀번호는 숫자, 영문, 특수문자를 1자 이상 혼합하여 8-20자리 입력해주세요.',
      );
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
    const updatedGenres = [...selectedGenres]; // 선택된 장르 배열 복사
    const genreIndex = updatedGenres.indexOf(selectedGenre); // 선택된 장르의 인덱스 확인

    if (genreIndex > -1) {
      // 이미 선택된 장르라면 선택 해제
      updatedGenres.splice(genreIndex, 1);
    } else if (updatedGenres.length < 3) {
      // 선택된 장르가 3개 미만일 경우에만 선택 추가
      updatedGenres.push(selectedGenre);
    }

    setSelectedGenres(updatedGenres);
    dispatch(setGenres(updatedGenres));
    validateConfirm();
  };

  const validateConfirm = () => {
    const isValid =
      selectedGender !== null &&
      selectedAge !== null &&
      selectedGenres !== null;
    setIsConfirmValid(isValid);
  };
  const handleConfirm = () => {
    const formData = {
      displayName,
      email,
      password,
      gender,
      age,
      genres,
    };

    axios
      .post('/users/signup', formData) //주소
      .then((response) => {
        onClose();
        navigate('/');
      })
      .catch((error) => {
        alert('필수 사항을 모두 체크해주세요');
      });
  };
  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer ref={modalRef} onClick={handleModalClick}>
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
                  <GenderText selected={selectedGender === '남자'}>
                    남자
                  </GenderText>
                </GenderBoxLabel>
                <GenderBoxLabel>
                  <GenderInput
                    type="radio"
                    name="gender"
                    value="여자"
                    checked={gender === 'female'}
                    onChange={() => handleGenderChange('여자')}
                  />
                  <GenderText selected={selectedGender === '여자'}>
                    여자
                  </GenderText>
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
                    type="checkbox"
                    name="genre"
                    value="action"
                    checked={selectedGenres.includes('액션')}
                    onChange={() => handleGenreChange('액션')}
                  />
                  <GenreText selected={selectedGenres.includes('액션')}>
                    액 션
                  </GenreText>
                </GenreBoxLabel>
                <GenreBoxLabel>
                  <GenreInput
                    type="checkbox"
                    name="genre"
                    value="fantasy"
                    checked={selectedGenres.includes('판타지')}
                    onChange={() => handleGenreChange('판타지')}
                  />
                  <GenreText selected={selectedGenres.includes('판타지')}>
                    판타지
                  </GenreText>
                </GenreBoxLabel>
                <GenreBoxLabel>
                  <GenreInput
                    type="checkbox"
                    name="genre"
                    value="animation"
                    checked={selectedGenres.includes('만화')}
                    onChange={() => handleGenreChange('만화')}
                  />
                  <GenreText selected={selectedGenres.includes('만화')}>
                    만 화
                  </GenreText>
                </GenreBoxLabel>
              </GenreBox>
              <GenreBox>
                <GenreTitlebottom></GenreTitlebottom>
                <GenreBoxLabel>
                  <GenreInput
                    type="checkbox"
                    name="genre"
                    value="melo"
                    checked={selectedGenres.includes('멜로')}
                    onChange={() => handleGenreChange('멜로')}
                  />
                  <GenreText selected={selectedGenres.includes('멜로')}>
                    멜 로
                  </GenreText>
                </GenreBoxLabel>
                <GenreBoxLabel>
                  <GenreInput
                    type="checkbox"
                    name="genre"
                    value="romance"
                    checked={selectedGenres.includes('로맨스')}
                    onChange={() => handleGenreChange('로맨스')}
                  />
                  <GenreText selected={selectedGenres.includes('로맨스')}>
                    로맨스
                  </GenreText>
                </GenreBoxLabel>
                <GenreBoxLabel>
                  <GenreInput
                    type="checkbox"
                    name="genre"
                    value="horror"
                    checked={selectedGenres.includes('공포')}
                    onChange={() => handleGenreChange('공포')}
                  />
                  <GenreText selected={selectedGenres.includes('공포')}>
                    공 포
                  </GenreText>
                </GenreBoxLabel>
              </GenreBox>
              <GenreBox>
                <GenreTitlebottom></GenreTitlebottom>
                <GenreBoxLabel>
                  <GenreInput
                    type="checkbox"
                    name="genre"
                    value="comedy"
                    checked={selectedGenres.includes('코미디')}
                    onChange={() => handleGenreChange('코미디')}
                  />
                  <GenreText selected={selectedGenres.includes('코미디')}>
                    코미디
                  </GenreText>
                </GenreBoxLabel>
                <GenreBoxLabel>
                  <GenreInput
                    type="checkbox"
                    name="genre"
                    value="documentary"
                    checked={selectedGenres.includes('다큐')}
                    onChange={() => handleGenreChange('다큐')}
                  />
                  <GenreText selected={selectedGenres.includes('다큐')}>
                    다 큐
                  </GenreText>
                </GenreBoxLabel>
                <GenreBoxLabel>
                  <GenreInput
                    type="checkbox"
                    name="genre"
                    value="null"
                    checked={selectedGenres.includes('기타')}
                    onChange={() => handleGenreChange('기타')}
                  />
                  <GenreText selected={selectedGenres.includes('기타')}>
                    기 타
                  </GenreText>
                </GenreBoxLabel>
              </GenreBox>
              <Alertmessage>⚠️ 선호 장르는 0-3개 선택해주세요</Alertmessage>
              <MessageBox>
                <SignupButton2 onClick={handlePrev}>이 전</SignupButton2>
                <SignupButton2
                  disabled={!isConfirmValid}
                  onClick={handleConfirm}
                >
                  확 인
                </SignupButton2>
              </MessageBox>
            </Container2page>
          )}
        </Container>
      </ModalContainer>
    </ModalBackground>
  );
};

export default SignupForm1;
