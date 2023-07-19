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

function PasswordEditForm() {
  const [editPassword, setEditPassword] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setEditPassword({ ...editPassword, [name]: value });
    },
    [editPassword],
  );

  const handleUpdatePassword = () => {
    if (editPassword.newPassword === editPassword.newPasswordConfirm)
      console.log(editPassword);
    // 유효성검사 dev merge 후 추가
  };

  return (
    <PasswordEditContainer>
      <TextInputContainer>
        <TextInputLabel htmlFor="currentPassword">현재 비밀번호</TextInputLabel>
        <TextInput
          type="password"
          id="currentPassword"
          name="currentPassword"
          onChange={handleChangePassword}
        />
      </TextInputContainer>
      <TextInputContainer>
        <TextInputLabel htmlFor="newPassword">새 비밀번호</TextInputLabel>
        <TextInput
          type="password"
          id="newPassword"
          name="newPassword"
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
          onChange={handleChangePassword}
        />
      </TextInputContainer>
      <PasswordButton type="button" onClick={handleUpdatePassword}>
        변경 완료
      </PasswordButton>
    </PasswordEditContainer>
  );
}

export default React.memo(PasswordEditForm);
