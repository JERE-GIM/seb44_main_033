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
  width: 480px;
  height: 200px;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: rgba(255, 255, 255, 1);
`;

export const ConfirmMessage = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  font-size: 20px;
  font-weight: 600;
`;

export const ConfirmCheckbox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export const ConfirmCheckboxText = styled.span`
  font-size: 15px;
  height: 15px;
  vertical-align: text-bottom;
`;

export const ConfirmCheckboxInput = styled.input`
  width: 15px;
  height: 15px;
  margin: 0;
  margin-left: 5px;
  cursor: pointer;
`;

export const ConfirmButtons = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  width: fit-content;
  height: 40px;
  padding: 0 40px;

  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 15px;
  background-color: var(--purple);
  color: white;

  &:not(:first-child) {
    margin-left: 30px;
  }
`;
