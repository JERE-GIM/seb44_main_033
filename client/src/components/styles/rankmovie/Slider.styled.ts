import { styled, css } from 'styled-components';

export const CommonButton = css`
  padding: 16px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  top: 40%;
  background-color: #fff;

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15px;
    height: 15px;
    color: #222;
  }
`;

export const PrevButton = styled.button`
  ${CommonButton}
  transform: translate(-50%, -50%);
`;

export const NextButton = styled.button`
  ${CommonButton}
  transform: translate(50%, -50%);
`;
