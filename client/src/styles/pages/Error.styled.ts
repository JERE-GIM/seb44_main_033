import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MessageRow = styled.div`
  display: flex;
`;

export const Icon = styled.img`
  width: 30px;
  height: 30px;
  filter: invert(100%) sepia(0%) saturate(1511%) hue-rotate(63deg)
    brightness(75%) contrast(104%); // #c4c4c4
`;

export const Message = styled.p`
  margin-left: 10px;
  color: var(--gray-dark);
  font-size: 30px;
`;

export const MessageLink = styled(Link)`
  color: var(--gray-dark);
  font-size: 20px;
  margin-top: 10px;
`;
