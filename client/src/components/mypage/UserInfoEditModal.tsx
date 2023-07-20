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
} from '../styles/UserInfoEditModal.styled';
import { PasswordButton } from '../styles/PasswordEditForm.styled';
import closeButton from '../../assets/closeButton.svg';
import { useCallback, useEffect, useState } from 'react';
import PasswordEditForm from './PasswordEditForm';
import { requestUpdateUserInfo } from '../../api/userInfo';
import { IUserInfo } from '../../types/user';

const genderValues = [
  {
    value: 'MALE',
    text: '남자',
  },
  { value: 'FEMALE', text: '여자' },
];
const ageValues = [10, 20, 30, 40, 50, 60];
const genreValues = [
  '모험',
  '판타지',
  '애니메이션',
  '드라마',
  '공포',
  '액션',
  '코미디',
  '역사',
  '서부',
  '스릴러',
  '범죄',
  '다큐멘터리',
  'SF',
  '미스터리',
  '음악',
  '로맨스',
  '가족',
  '전쟁',
  'TV 영화',
];

interface IUserInfoInput {
  username: string;
  age: number | null;
  genre: Array<string>;
}

interface IUserInfoEditModalProps {
  user: IUserInfo;
  callback: () => void;
}

export default function UserInfoEditModal({
  user,
  callback,
}: IUserInfoEditModalProps) {
  const dispatch = useAppDispatch();

  const [isEditPassword, setIsEditPassword] = useState(false);
  const [userInfoInput, setUserInfoInput] = useState<IUserInfoInput>({
    username: '',
    age: null,
    genre: [],
  });

  const handleCloseModalUnsaved = () => {
    dispatch(modalAction.close());
  };

  const handleClickModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    requestUpdateUserInfo(userInfoInput).then(() => {
      callback();
      dispatch(modalAction.close());
    });
  };

  const handleChangeUserInfo = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (name === 'age')
        setUserInfoInput({ ...userInfoInput, [name]: Number(value) });
      else setUserInfoInput({ ...userInfoInput, [name]: value });
    },
    [userInfoInput],
  );

  useEffect(() => {
    const { username, age, genre } = user;

    setUserInfoInput({
      username,
      age,
      genre,
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
              name="username"
              autoComplete="off"
              value={userInfoInput.username}
              onChange={handleChangeUserInfo}
            />
          </TextInputContainer>
          <TextInputContainer>
            <TextInputLabel htmlFor="email">이메일</TextInputLabel>
            <TextInput id="email" name="email" value={user.email} disabled />
          </TextInputContainer>
          <InputContainer>
            <InputContainerTitle>비밀번호</InputContainerTitle>
            <div>
              <PasswordButton
                type="button"
                onClick={() => setIsEditPassword((prev) => !prev)}
              >
                비밀번호 변경
              </PasswordButton>
              {isEditPassword && <PasswordEditForm />}
            </div>
          </InputContainer>
          <InputContainer>
            <InputContainerTitle>성별</InputContainerTitle>
            <RadioInputList>
              {genderValues.map((gender) => (
                <RadioLabel
                  key={gender.value}
                  $selected={user.gender === gender.value}
                >
                  <RadioInput
                    type="radio"
                    name="gender"
                    value={gender.value}
                    disabled
                  />
                  {gender.text}
                </RadioLabel>
              ))}
            </RadioInputList>
          </InputContainer>
          <InputContainer>
            <InputContainerTitle>나이</InputContainerTitle>
            <RadioInputListContainer>
              <RadioInputList>
                {ageValues.map((age) => (
                  <RadioLabel
                    key={age}
                    $selected={
                      userInfoInput
                        ? userInfoInput.age === age
                        : user.age === age
                    }
                  >
                    <RadioInput
                      type="radio"
                      name="age"
                      value={age}
                      onChange={handleChangeUserInfo}
                    />
                    {age}대
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
                    $selected={userInfoInput.genre.includes(genre)}
                  >
                    <RadioInput
                      type="radio"
                      name="genres"
                      value={genre}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setUserInfoInput({
                          ...userInfoInput,
                          genre:
                            userInfoInput.genre.length >= 2
                              ? [event.target.value]
                              : userInfoInput.genre.concat(event.target.value),
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
