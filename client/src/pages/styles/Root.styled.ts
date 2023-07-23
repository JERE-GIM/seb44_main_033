import { styled } from 'styled-components';

export const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
`;

export const Header = styled.div`
  position: fixed;
  padding-top: 60px;
`;
export const Footer = styled.div`
  transform: translateY(-100%);
  height: 100px;
  position: relative;
`;
