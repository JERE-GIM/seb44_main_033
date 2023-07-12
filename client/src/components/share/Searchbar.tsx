import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  SearchbarContainer,
  SearchInput,
  SearchButton,
} from '../styles/Searchbar.styled';

const Searchbar: React.FC = () => {
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // 검색 기능 넣는 자리로 쓰기(Search 브랜치에서 하자)
  };

  return (
    <SearchbarContainer>
      <SearchInput
        type="text"
        placeholder="영화와 관련된 검색어를 입력해주세요."
      />
      <SearchButton onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} size="2x" />
      </SearchButton>
    </SearchbarContainer>
  );
};

export default Searchbar;
