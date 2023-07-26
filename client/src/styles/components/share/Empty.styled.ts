import { styled } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: center;
`;

export const Icon = styled.img`
  filter: invert(100%) sepia(0%) saturate(1511%) hue-rotate(63deg)
    brightness(75%) contrast(104%); // #c4c4c4
`;

export const Message = styled.p`
  margin-left: 10px;
  color: var(--gray-dark);
`;
