import { styled } from 'styled-components';

export const TabContainer = styled.div`
  margin-bottom: 20px;
`;

export const TabMenuContainer = styled.div`
  display: flex;
`;

export interface TabItemProps {
  isActive: boolean;
}

export const TabItem = styled.button<TabItemProps>`
  font-size: 25px;
  font-weight: 700;
  padding: 8px 16px;
  margin-left: 10px;
  margin-right: 8px;
  color: ${(props) => (props.isActive ? '#000' : '#c4c4c4')};
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${(props) => (props.isActive ? '#000' : 'transparent')};
  }

  &:hover {
    color: #000;
  }
`;

export const TabContentContainer = styled.div`
  margin-top: 10px;
`;
