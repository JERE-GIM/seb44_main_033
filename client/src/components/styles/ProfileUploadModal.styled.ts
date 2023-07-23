import { styled } from 'styled-components';

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--black-80a);
`;

export const Modal = styled.div`
  width: 480px;
  height: 400px;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;

  background-color: var(--white);
`;

export const ModalHeader = styled.header`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.p`
  font-weight: 800;
  font-size: 20px;
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray);

  border: none;
  border-radius: 50%;

  & svg {
    width: 16px;
    height: 16px;
  }
`;

export const Form = styled.form`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Profile = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
`;

export const FileInputLabel = styled.label`
  cursor: pointer;
  width: 100px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  margin-bottom: 30px;

  &:hover {
    text-decoration: underline;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const Controller = styled.div`
  display: flex;
  justify-content: center;
`;

export const SubmitButton = styled.button<{ disabled: boolean }>`
  width: fit-content;
  height: 40px;
  padding: 0 40px;

  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 15px;
  background-color: ${({ disabled }) =>
    disabled ? 'var(--gray)' : 'var(--purple)'};
  color: ${({ disabled }) => (disabled ? 'var(--gray-deep)' : 'var(--white)')};
`;
