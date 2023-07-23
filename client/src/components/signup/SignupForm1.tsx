import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextPage,
  prevPage,
  setUsername,
  setEmail,
  setPassword,
  setGender,
  setAge,
  setGenres,
} from '../../redux/reducers/singupSlice';
import {
  ModalBackground,
  ModalContainer,
  Container1page,
  LogoTitle,
  SubTitle,
  UserNameBox,
  UserNameInput,
  EmailBox,
  EmailInput,
  PasswordBox,
  PasswordInput,
  SignupButton,
  LoginmessageBox,
  Loginmessage,
  Loginlink,
  OAuthbox,
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
import NaverLogin from '../login/Naverlogin';
import KakaoLogin from '../login/Kakaologin';
import GoogleLogin from '../login/Googlelogin';

// 닉네임
export const isUserNameValid = (username: string): boolean => {
  return username.trim() !== '' && username.length <= 12;
};

// 이메일
export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.trim() !== '' && emailRegex.test(email);
};

// 비번
export const isPasswordValid = (password: string): boolean => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9\s]).{8,20}$/;
  return password.trim() !== '' && passwordRegex.test(password);
};

const SignupForm1: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { currentPage, username, email, password, gender, age, genres } =
    useSelector((state: RootState) => state.signup);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isConfirmValid, setIsConfirmValid] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null); // 모달 참조?
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 모달 창 내부를 클릭했을 때에는 모달 창 안닫힘
    e.stopPropagation();
  };

  const handleNext = () => {
    if (!isUserNameValid(username)) {
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
  const handleusernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
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

  const handleAgeChange = (selectedAge: number) => {
    setSelectedAge(selectedAge);
    dispatch(setAge(selectedAge));
    validateConfirm();
  };

  const handleGenreChange = (selectedGenre: string) => {
    const updatedGenres = [...selectedGenres]; // 선택된 장르 배열 복사
    const genreIndex = updatedGenres.indexOf(selectedGenre); // 선택된 장르의 인덱스 확인

    if (genreIndex > -1) {
      // 체크한 장르 선택 해제
      updatedGenres.splice(genreIndex, 1);
    } else if (updatedGenres.length < 3) {
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
      email,
      password,
      gender: selectedGender,
      age: selectedAge,
      username,
      genres: selectedGenres,
    };

    axios
      .post(
        `http://ec2-54-180-99-202.ap-northeast-2.compute.amazonaws.com:8080/signup`,
        formData,
      )
      .then(() => {
        alert('회원가입에 성공하였습니다.');
        onClose();
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        alert('필수 사항을 모두 체크해주세요');
      });
  };
  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer ref={modalRef} onClick={handleModalClick}>
        {currentPage === 1 && (
          <Container1page>
            <LogoTitle>CINEMA PRINCESS</LogoTitle>
            <SubTitle>Sign up</SubTitle>
            <UserNameBox>
              <UserNameInput
                value={username}
                placeholder="username"
                onChange={handleusernameChange}
              />
            </UserNameBox>
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
              <Loginlink>Click Login</Loginlink>
            </LoginmessageBox>
            <div>or</div>
            <OAuthbox>
              <KakaoLogin />
              <NaverLogin />
              <GoogleLogin />
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
                  checked={gender === '남자'}
                  onChange={() => handleGenderChange('MALE')}
                />
                <GenderText selected={selectedGender === 'MALE'}>
                  남자
                </GenderText>
              </GenderBoxLabel>
              <GenderBoxLabel>
                <GenderInput
                  type="radio"
                  name="gender"
                  value="여자"
                  checked={gender === '여자'}
                  onChange={() => handleGenderChange('FEMALE')}
                />
                <GenderText selected={selectedGender === 'FEMALE'}>
                  여자
                </GenderText>
              </GenderBoxLabel>
            </GenderBox>
            <AgeBox>
              <AgeTitle>나이</AgeTitle>
              <AgeBoxLabel>
                <AgeInput
                  type="radio"
                  name="age"
                  value="10"
                  checked={age === '10'}
                  onChange={() => handleAgeChange(10)}
                />
                <AgeText selected={selectedAge === 10}>10대</AgeText>
              </AgeBoxLabel>
              <AgeBoxLabel>
                <AgeInput
                  type="radio"
                  name="age"
                  value="20"
                  checked={age === '20'}
                  onChange={() => handleAgeChange(20)}
                />
                <AgeText selected={selectedAge === 20}>20대</AgeText>
              </AgeBoxLabel>
            </AgeBox>
            <AgeBox>
              <AgeTitlebottom></AgeTitlebottom>
              <AgeBoxLabel>
                <AgeInput
                  type="radio"
                  name="age"
                  value="30"
                  checked={age === '30'}
                  onChange={() => handleAgeChange(30)}
                />
                <AgeText selected={selectedAge === 30}>30대</AgeText>
              </AgeBoxLabel>
              <AgeBoxLabel>
                <AgeInput
                  type="radio"
                  name="age"
                  value="40"
                  checked={age === '40'}
                  onChange={() => handleAgeChange(40)}
                />
                <AgeText selected={selectedAge === 40}>40대</AgeText>
              </AgeBoxLabel>
            </AgeBox>
            <AgeBox>
              <AgeTitlebottom></AgeTitlebottom>
              <AgeBoxLabel>
                <AgeInput
                  type="radio"
                  name="age"
                  value="50"
                  checked={age === '50'}
                  onChange={() => handleAgeChange(50)}
                />
                <AgeText selected={selectedAge === 50}>50대</AgeText>
              </AgeBoxLabel>
              <AgeBoxLabel>
                <AgeInput
                  type="radio"
                  name="age"
                  value="60"
                  checked={age === '60'}
                  onChange={() => handleAgeChange(60)}
                />
                <AgeText selected={selectedAge === 60}>60대</AgeText>
              </AgeBoxLabel>
            </AgeBox>
            {/* 선호 장르 작업선 */}
            <GenreBox>
              <GenreTitle>선호 장르</GenreTitle>
              <GenreBoxLabel>
                <GenreInput
                  type="checkbox"
                  name="genres"
                  value="28"
                  checked={selectedGenres.includes('28')}
                  onChange={() => handleGenreChange('28')}
                />
                <GenreText selected={selectedGenres.includes('28')}>
                  액 션
                </GenreText>
              </GenreBoxLabel>
              <GenreBoxLabel>
                <GenreInput
                  type="checkbox"
                  name="genres"
                  value="14"
                  checked={selectedGenres.includes('14')}
                  onChange={() => handleGenreChange('14')}
                />
                <GenreText selected={selectedGenres.includes('14')}>
                  판타지
                </GenreText>
              </GenreBoxLabel>
              <GenreBoxLabel>
                <GenreInput
                  type="checkbox"
                  name="genres"
                  value="16"
                  checked={selectedGenres.includes('16')}
                  onChange={() => handleGenreChange('16')}
                />
                <GenreText selected={selectedGenres.includes('16')}>
                  만 화
                </GenreText>
              </GenreBoxLabel>
            </GenreBox>
            <GenreBox>
              <GenreTitlebottom></GenreTitlebottom>
              <GenreBoxLabel>
                <GenreInput
                  type="checkbox"
                  name="genres"
                  value="36"
                  checked={selectedGenres.includes('36')}
                  onChange={() => handleGenreChange('36')}
                />
                <GenreText selected={selectedGenres.includes('36')}>
                  역 사
                </GenreText>
              </GenreBoxLabel>
              <GenreBoxLabel>
                <GenreInput
                  type="checkbox"
                  name="genres"
                  value="10749"
                  checked={selectedGenres.includes('10749')}
                  onChange={() => handleGenreChange('10749')}
                />
                <GenreText selected={selectedGenres.includes('10749')}>
                  로맨스
                </GenreText>
              </GenreBoxLabel>
              <GenreBoxLabel>
                <GenreInput
                  type="checkbox"
                  name="genres"
                  value="27"
                  checked={selectedGenres.includes('27')}
                  onChange={() => handleGenreChange('27')}
                />
                <GenreText selected={selectedGenres.includes('27')}>
                  공 포
                </GenreText>
              </GenreBoxLabel>
            </GenreBox>
            <GenreBox>
              <GenreTitlebottom></GenreTitlebottom>
              <GenreBoxLabel>
                <GenreInput
                  type="checkbox"
                  name="genres"
                  value="35"
                  checked={selectedGenres.includes('35')}
                  onChange={() => handleGenreChange('35')}
                />
                <GenreText selected={selectedGenres.includes('35')}>
                  코미디
                </GenreText>
              </GenreBoxLabel>
              <GenreBoxLabel>
                <GenreInput
                  type="checkbox"
                  name="genres"
                  value="99"
                  checked={selectedGenres.includes('99')}
                  onChange={() => handleGenreChange('99')}
                />
                <GenreText selected={selectedGenres.includes('99')}>
                  다 큐
                </GenreText>
              </GenreBoxLabel>
              <GenreBoxLabel>
                <GenreInput
                  type="checkbox"
                  name="genres"
                  value=""
                  checked={selectedGenres.includes('')}
                  onChange={() => handleGenreChange('')}
                />
                <GenreText selected={selectedGenres.includes('')}>
                  기 타
                </GenreText>
              </GenreBoxLabel>
            </GenreBox>
            <Alertmessage>⚠️ 선호 장르는 1-3개 선택해주세요</Alertmessage>
            <MessageBox>
              <SignupButton2 onClick={handlePrev}>이 전</SignupButton2>
              <SignupButton2 disabled={!isConfirmValid} onClick={handleConfirm}>
                확 인
              </SignupButton2>
            </MessageBox>
          </Container2page>
        )}
      </ModalContainer>
    </ModalBackground>
  );
};

export default SignupForm1;
