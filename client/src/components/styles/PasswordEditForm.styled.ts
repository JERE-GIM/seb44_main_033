import { styled } from 'styled-components';
import { TextInput } from './UserInfoEditModal.styled';

export const PasswordButton = styled.button`
  height: 30px;
  line-height: 28px;
  padding: 0 10px;
  border: 1px solid var(--gray-dark);
  border-radius: 5px;
  background-color: var(--white);
  font-weight: 500;
`;

export const PasswordEditContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 10px 0;

  & > div {
    margin-bottom: 10px;
  }

  & label {
    width: 120px;
  }

  & > button {
    position: absolute;
    bottom: 20px;
    right: -80px;
  }
`;

export const PasswordInput = styled(TextInput)`
  width: 200px;
`;
