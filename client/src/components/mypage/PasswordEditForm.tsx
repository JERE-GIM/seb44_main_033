import React, { useCallback, useState } from 'react';
import {
  PasswordButton,
  PasswordEditContainer,
} from '../styles/PasswordEditForm.styled';
import {
  TextInput,
  TextInputContainer,
  TextInputLabel,
} from '../styles/UserInfoEditModal.styled';
import { fetchUpdatePassword } from '../../api/userInfo';
import { isPasswordValid } from '../signup/SignupForm1';

function PasswordEditForm() {
  const [editPassword, setEditPassword] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const handleFetchUpdatePassword = () => {
    fetchUpdatePassword({
      password: editPassword.currentPassword,
      newPassword: editPassword.newPassword,
    })
      .then(() => {
        alert('비밀번호가 변경되었습니다.');
        setEditPassword({
          currentPassword: '',
          newPassword: '',
          newPasswordConfirm: '',
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setEditPassword({ ...editPassword, [name]: value });
    },
    [editPassword],
  );

  const handleCompleteEditPassword = () => {
    if (!isPasswordValid(editPassword.currentPassword))
      return alert(
        '비밀번호는 숫자, 영문, 특수문자를 1자 이상 혼합하여 8-20자리 입력해주세요.',
      );
    if (!isPasswordValid(editPassword.newPassword))
      return alert(
        '비밀번호는 숫자, 영문, 특수문자를 1자 이상 혼합하여 8-20자리 입력해주세요.',
      );
    if (editPassword.newPassword !== editPassword.newPasswordConfirm)
      return alert('변경 비밀번호가 일치하지 않습니다.');

    handleFetchUpdatePassword();
  };

  return (
    <PasswordEditContainer>
      <TextInputContainer>
        <TextInputLabel htmlFor="currentPassword">현재 비밀번호</TextInputLabel>
        <TextInput
          type="password"
          id="currentPassword"
          name="currentPassword"
          placeholder="숫자, 영문, 특수문자를 혼합하여 8-20자리 입력해주세요."
          value={editPassword.currentPassword}
          onChange={handleChangePassword}
        />
      </TextInputContainer>
      <TextInputContainer>
        <TextInputLabel htmlFor="newPassword">새 비밀번호</TextInputLabel>
        <TextInput
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="숫자, 영문, 특수문자를 혼합하여 8-20자리 입력해주세요."
          value={editPassword.newPassword}
          onChange={handleChangePassword}
        />
      </TextInputContainer>
      <TextInputContainer>
        <TextInputLabel htmlFor="newPasswordConfirm">
          새 비밀번호 확인
        </TextInputLabel>
        <TextInput
          type="password"
          id="newPasswordConfirm"
          name="newPasswordConfirm"
          placeholder="숫자, 영문, 특수문자를 혼합하여 8-20자리 입력해주세요."
          value={editPassword.newPasswordConfirm}
          onChange={handleChangePassword}
        />
      </TextInputContainer>
      <PasswordButton type="button" onClick={handleCompleteEditPassword}>
        변경 완료
      </PasswordButton>
    </PasswordEditContainer>
  );
}

export default React.memo(PasswordEditForm);
