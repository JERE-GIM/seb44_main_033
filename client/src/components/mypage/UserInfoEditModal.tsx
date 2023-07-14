import { modalAction } from '../../redux/reducers/modal';
import { useAppDispatch } from '../../redux/store';
import {
  Background,
  CloseButton,
  Controller,
  Form,
  Modal,
  ModalHeader,
  ModalTitle,
  RadioInput,
  InputContainer,
  InputContainerTitle,
  RadioInputList,
  RadioInputListContainer,
  RadioLabel,
  SubmitButton,
  TextInput,
  TextInputContainer,
  TextInputLabel,
  PasswordButton,
  PasswordEditContainer,
} from '../styles/UserInfoEditModal.styled';
import closeButton from '../../assets/closeButton.svg';
import { useEffect, useState } from 'react';

interface IUserInfo {
  username: string;
  email: string;
  gender: string;
  age: string;
  genres: Array<string>;
}

const genderValues = ['남자', '여자'];
const ageValues = ['10대 이하', '20대', '30대', '40대', '50대', '60대 이상'];
const genreValues = [
  '액션',
  'SF',
  '로맨스',
  '애니메이션',
  '공포',
  '드라마',
  '모험',
  '코미디',
  '로맨틱코미디',
];

export default function UserInfoEditModal({ user }: { user: IUserInfo }) {
  const dispatch = useAppDispatch();
  const [editPassword, setEditPassword] = useState({
    status: false,
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    username: '',
    email: '',
    gender: '',
    age: '',
    genres: [],
  });

  const handleCloseModalUnsaved = () => {
    dispatch(modalAction.close());
  };

  const handleClickModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userInfo);
    // api 로직 추가
  };

  const handleUpdatePassword = () => {
    if (editPassword.newPassword === editPassword.newPasswordConfirm)
      console.log(editPassword);
    // 유효성검사 dev merge 후 추가
  };

  useEffect(() => {
    const { username, email, gender, age, genres } = user;

    setUserInfo({
      username,
      email,
      gender,
      age,
      genres,
    });
  }, []);

  return (
    <Background onClick={handleCloseModalUnsaved}>
      <Modal onClick={handleClickModal}>
        <ModalHeader>
          <ModalTitle>회원정보 수정</ModalTitle>
          <CloseButton onClick={handleCloseModalUnsaved}>
            <img src={closeButton} alt="close button" />
          </CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmitForm}>
          <TextInputContainer>
            <TextInputLabel htmlFor="username">닉네임</TextInputLabel>
            <TextInput
              id="username"
              autoComplete="off"
              value={userInfo.username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUserInfo({ ...userInfo, username: event.target.value })
              }
            />
          </TextInputContainer>
          <TextInputContainer>
            <TextInputLabel htmlFor="email">이메일</TextInputLabel>
            <TextInput
              id="email"
              autoComplete="off"
              value={userInfo.email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUserInfo({ ...userInfo, email: event.target.value })
              }
            />
          </TextInputContainer>
          <InputContainer>
            <InputContainerTitle>비밀번호</InputContainerTitle>
            <div>
              <PasswordButton
                type="button"
                onClick={() =>
                  setEditPassword((prev) => ({
                    ...prev,
                    status: !prev.status,
                  }))
                }
              >
                비밀번호 변경
              </PasswordButton>
              {editPassword.status && (
                <PasswordEditContainer>
                  <TextInputContainer>
                    <TextInputLabel htmlFor="currentPassword">
                      현재 비밀번호
                    </TextInputLabel>
                    <TextInput
                      type="password"
                      id="currentPassword"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setEditPassword({
                          ...editPassword,
                          currentPassword: event.target.value,
                        })
                      }
                    />
                  </TextInputContainer>
                  <TextInputContainer>
                    <TextInputLabel htmlFor="newPassword">
                      새 비밀번호
                    </TextInputLabel>
                    <TextInput
                      type="password"
                      id="newPassword"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setEditPassword({
                          ...editPassword,
                          newPassword: event.target.value,
                        })
                      }
                    />
                  </TextInputContainer>
                  <TextInputContainer>
                    <TextInputLabel htmlFor="newPasswordConfirm">
                      새 비밀번호 확인
                    </TextInputLabel>
                    <TextInput
                      type="password"
                      id="newPasswordConfirm"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setEditPassword({
                          ...editPassword,
                          newPasswordConfirm: event.target.value,
                        })
                      }
                    />
                  </TextInputContainer>
                  <PasswordButton type="button" onClick={handleUpdatePassword}>
                    변경 완료
                  </PasswordButton>
                </PasswordEditContainer>
              )}
            </div>
          </InputContainer>
          <InputContainer>
            <InputContainerTitle>성별</InputContainerTitle>
            <RadioInputList>
              {genderValues.map((gender) => (
                <RadioLabel key={gender} $selected={userInfo.gender === gender}>
                  <RadioInput
                    type="radio"
                    name="gender"
                    value={gender}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setUserInfo({ ...userInfo, gender: event.target.value });
                    }}
                  />
                  {gender}
                </RadioLabel>
              ))}
            </RadioInputList>
          </InputContainer>
          <InputContainer>
            <InputContainerTitle>나이</InputContainerTitle>
            <RadioInputListContainer>
              <RadioInputList>
                {ageValues.map((age) => (
                  <RadioLabel key={age} $selected={userInfo.age === age}>
                    <RadioInput
                      type="radio"
                      name="age"
                      value={age}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setUserInfo({ ...userInfo, age: event.target.value });
                      }}
                    />
                    {age}
                  </RadioLabel>
                ))}
              </RadioInputList>
              <RadioInputList></RadioInputList>
            </RadioInputListContainer>
          </InputContainer>
          <InputContainer>
            <InputContainerTitle>좋아하는 장르</InputContainerTitle>
            <RadioInputListContainer>
              <RadioInputList>
                {genreValues.map((genre) => (
                  <RadioLabel
                    key={genre}
                    $selected={userInfo.genres.includes(genre)}
                  >
                    <RadioInput
                      type="radio"
                      name="genres"
                      value={genre}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setUserInfo({
                          ...userInfo,
                          genres:
                            userInfo.genres.length >= 2
                              ? [event.target.value]
                              : userInfo.genres.concat(event.target.value),
                        });
                      }}
                    />
                    {genre}
                  </RadioLabel>
                ))}
              </RadioInputList>
            </RadioInputListContainer>
          </InputContainer>
          <Controller>
            <SubmitButton>수정</SubmitButton>
          </Controller>
        </Form>
      </Modal>
    </Background>
  );
}
