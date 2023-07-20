import React, { ChangeEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {
  SearchbarContainer,
  SearchInput,
  SearchButton,
} from '../styles/Searchbar.styled';

const Searchbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    navigate('/search', { state: { searchTerm } });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <SearchbarContainer>
      <SearchInput
        type="text"
        placeholder="영화와 관련된 검색어를 입력해주세요."
        onChange={handleInputChange}
      />
      <SearchButton onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} size="2x" />
      </SearchButton>
    </SearchbarContainer>
  );
};

export default Searchbar;
