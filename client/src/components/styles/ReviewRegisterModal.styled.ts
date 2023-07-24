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
  z-index: var(--z-index-2);

  background-color: var(--black-80a);
`;

export const Modal = styled.div`
  width: 480px;
  height: 480px;
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

export const MovieTitle = styled.p`
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
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  flex-grow: 1;
  margin: 10px 0;

  border: none;
  outline: none;
  resize: none;
  font-weight: 500;
  font-size: 20px;

  &::placeholder {
    color: var(--gray-dark);
  }
`;

export const Controller = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SubmitButton = styled.button`
  width: fit-content;
  height: 40px;
  padding: 0 40px;

  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 15px;
  background-color: var(--purple);
  color: white;
`;
