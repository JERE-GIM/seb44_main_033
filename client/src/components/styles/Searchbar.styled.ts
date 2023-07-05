import styled from 'styled-components';

export const SearchbarContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 4px;
  margin-left: 100px;
  height: 40px;
`;

export const SearchInput = styled.input`
  padding: 0px 12px;
  border: none;
  margin-right: 8px;
  width: 400px;
  font-size: 16px;
  font-weight: bold;
  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: none;
  color: black;
  cursor: pointer;
`;
