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

  background-color: rgba(0, 0, 0, 0.5);
`;

export const Modal = styled.div`
  width: 560px;
  border-radius: 16px;
  padding: 30px;
  display: flex;
  flex-direction: column;

  background-color: rgba(255, 255, 255, 1);
`;

export const ModalHeader = styled.header`
  margin-bottom: 20px;
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
`;

export const TextInputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

export const TextInputLabel = styled.label`
  font-size: 15px;
  font-weight: 600;
  width: 60px;
  height: 30px;
  line-height: 30px;
`;

export const TextInput = styled.input`
  outline: none;
  border: none;
  border-radius: 5px;
  height: 30px;
  padding: 0 10px;
  background-color: var(--gray);
  font-size: 16px;
`;

export const InputContainer = styled.div`
  margin-bottom: 10px;
  display: flex;

  &:nth-child(6) {
    display: block;

    & > span {
      width: fit-content;
    }
  }
`;

export const InputContainerTitle = styled.span`
  flex-shrink: 0;
  display: inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const RadioInputListContainer = styled.div``;

export const RadioInputList = styled.div`
  width: 100%;
`;

export const RadioInput = styled.input`
  display: none;
`;

export const RadioLabel = styled.label<{ $selected: boolean }>`
  display: inline-block;
  cursor: pointer;
  background-color: ${({ $selected }) =>
    $selected ? 'var(--purple-light)' : 'var(--gray)'};
  color: ${({ $selected }) => ($selected ? 'var(--white)' : 'var(--black)')};
  border-radius: 5px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const Controller = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
