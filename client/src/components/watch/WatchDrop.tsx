import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
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
import { fetchWatchlist, WatchMovie } from '../../api/getWatchlist';

export default function WatchDrop() {
  const [isOpen, setIsopen] = useState<boolean>(false);
  // const [selectedOption, setSelectedOption] = useState<string>('담은순');

  // const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.watchlist.movies);
  const [sortOption, setSortOption] = useState<string>('담은순');
  const [moviesToShow, setMoviesToShow] = useState<WatchMovie[]>([]);
  const onToggle = () => setIsopen(!isOpen);

  const handleSortOptionChange = (option: '담은순' | '신작순' | '이름순') => {
    setSortOption(option);
    setIsopen(false);
  };

  useEffect(() => {
    const userId = 1;
    dispatch(fetchWatchlist(userId));
  }, []);

  //무한스크롤
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //필터기능
  useEffect(() => {
    const sortedMovies = movies.slice().sort((a: WatchMovie, b: WatchMovie) => {
      if (sortOption === '담은순') {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (sortOption === '신작순') {
        return (
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
      } else if (sortOption === '이름순') {
        return a.title.localeCompare(b.title);
      } else {
        return 0;
      }
    });
    setMoviesToShow(sortedMovies.slice(0, page * 8));
  }, [movies, sortOption, page]);

  // //북마크 클릭 영화 제거
  // const handleBookmarkClick = (movieid: string) => {
  //   setSortedMovies((prevMovies) => {
  //     const updatedMovies = prevMovies.filter(
  //       (movie) => movie.movieId !== movieid,
  //     );
  //     return updatedMovies;
  //   });
  // };

  return (
    <>
      <Title>찜한영화</Title>
      <CategoryMenuBox>
        <CategoryMenu onClick={onToggle}>
          <FontAwesomeIcon icon={faChevronDown} width={20} />
          <p>{sortOption}</p>
        </CategoryMenu>
      </CategoryMenuBox>
      <DropDownBoxWrap>
        <DropDownContainer>
          {isOpen && (
            <>
              <ListItem onClick={() => handleSortOptionChange('담은순')}>
                담은순
              </ListItem>
              <ListItem onClick={() => handleSortOptionChange('신작순')}>
                신작순
              </ListItem>
              <ListItem onClick={() => handleSortOptionChange('이름순')}>
                이름순
              </ListItem>
            </>
          )}
        </DropDownContainer>
      </DropDownBoxWrap>
      <Container>
        {movies &&
          moviesToShow.map((movie: WatchMovie) => (
            <MovieItem key={movie.movieId}>
              <div style={{ position: 'relative' }}>
                <MovieImage
                  src={`https://image.tmdb.org/t/p/w200/${movie.posterPath}`}
                  alt={movie.title}
                />
                {/* <WatchBookmark
                movieId={movie.movieId}
                onClick={handleBookmarkClick}
              /> */}
              </div>
              <p>{movie.title}</p>
              <p>{movie.releaseDate.split('-')[0]}</p>
            </MovieItem>
          ))}
      </Container>
    </>
  );
}
