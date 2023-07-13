import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {
  Title,
  CategoryMenuBox,
  CategoryMenu,
  DropDownBoxWrap,
  DropDownContainer,
  ListItem,
  Container,
  MovieItem,
  MovieImage,
} from '../styles/watchlist/WatchDrop.styled';

//dummy
import { ITop, dummyTopMovie } from '../../dummy/dummyTop';

export default function WatchDrop() {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('이름순');
  const [sortedMovies, setSortedMovies] = useState<ITop[]>(dummyTopMovie);

  const onToggle = () => setIsopen(!isOpen);
  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsopen(false);
  };

  useEffect(() => {
    if (selectedOption === '이름순') {
      const sortedByTitle = [...dummyTopMovie].sort((a, b) =>
        a.title.localeCompare(b.title),
      );
      setSortedMovies(sortedByTitle);
    } else if (selectedOption === '신작순') {
      const sortedByOpenAt = [...dummyTopMovie].sort(
        (a, b) => new Date(b.openat).getTime() - new Date(a.openat).getTime(),
      );
      setSortedMovies(sortedByOpenAt);
    } else {
      setSortedMovies(dummyTopMovie);
    }
  }, [selectedOption]);

  return (
    <>
      <Title>찜한영화</Title>
      <CategoryMenuBox>
        <CategoryMenu onClick={onToggle}>
          <FontAwesomeIcon icon={faChevronDown} width={20} />
          <p>{selectedOption}</p>
        </CategoryMenu>
      </CategoryMenuBox>
      <DropDownBoxWrap>
        <DropDownContainer>
          {isOpen && (
            <>
              <ListItem onClick={onOptionClicked('이름순')}>이름순</ListItem>
              <ListItem onClick={onOptionClicked('신작순')}>신작순</ListItem>
              <ListItem onClick={onOptionClicked('평점순')}>평점순</ListItem>
            </>
          )}
        </DropDownContainer>
      </DropDownBoxWrap>
      <Container>
        {sortedMovies.map((movie) => (
          <MovieItem key={movie.id}>
            <MovieImage src={movie.poster} alt={movie.title} />
            <p>{movie.title}</p>
            <p>{movie.openat}</p>
          </MovieItem>
        ))}
      </Container>
    </>
  );
}
