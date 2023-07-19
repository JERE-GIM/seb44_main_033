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
import { WatchBookmark } from './WatchBookMark';

//dummy
import { ITop, dummyWatch } from '../../dummy/dummyWatch';

export default function WatchDrop() {
  const [isOpen, setIsopen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('이름순');
  const [sortedMovies, setSortedMovies] = useState<ITop[]>(dummyWatch);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const onToggle = () => setIsopen(!isOpen);
  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsopen(false);
  };

  // 무한스크롤
  useEffect(() => {
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollHeight - (scrollTop + clientHeight) < 100 && !isLoading) {
        setIsLoading(true);
        setTimeout(() => {
          const start = page * 4;
          const end = start + 4;
          if (start >= dummyWatch.length) {
            setIsLoading(false);
            return;
          }
          const newData = dummyWatch.slice(start, end);
          setSortedMovies((prevMovies) => [...prevMovies, ...newData]);
          setIsLoading(false);
          setPage((prevPage) => prevPage + 1);
        }, 1000);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page, isLoading]);

  //필터기능
  useEffect(() => {
    if (selectedOption === '이름순') {
      const sortedByTitle = [...dummyWatch].sort((a, b) =>
        a.title.localeCompare(b.title),
      );
      setSortedMovies(sortedByTitle.slice(0, 12));
    } else if (selectedOption === '신작순') {
      const sortedByOpenAt = [...dummyWatch].sort(
        (a, b) => new Date(b.openat).getTime() - new Date(a.openat).getTime(),
      );
      setSortedMovies(sortedByOpenAt.slice(0, 12));
    } else {
      setSortedMovies(dummyWatch.slice(0, 12));
    }
    setPage(1);
  }, [selectedOption]);

  //북마크 클릭 영화 제거
  const handleBookmarkClick = (movieId: string) => {
    setSortedMovies((prevMovies) => {
      const updatedMovies = prevMovies.filter((movie) => movie.id !== movieId);
      return updatedMovies;
    });
  };
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
            <div style={{ position: 'relative' }}>
              <MovieImage src={movie.poster} alt={movie.title} />
              <WatchBookmark movieId={movie.id} onClick={handleBookmarkClick} />
            </div>
            <p>{movie.title}</p>
            <p>{movie.openat}</p>
          </MovieItem>
        ))}
      </Container>
    </>
  );
}
