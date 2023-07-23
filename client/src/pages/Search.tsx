import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchSearch, Movie } from '../api/getSearch';
import Card from '../components/main/movierank/Card';
import Pagination from '../components/share/Pagination';
import { useState } from 'react';
import styled from 'styled-components';

const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchTerm = location.state?.searchTerm;
  const searchResult = useAppSelector((state) => state.search.data);
  const [currentPage, setCurrentPage] = useState(1);

  const moviesPerPage = 16;
  const totalPages = Math.ceil(searchResult.length / moviesPerPage);

  useEffect(() => {
    if (searchTerm) {
      dispatch(
        fetchSearch({
          keyword: searchTerm,
          page: currentPage,
          size: moviesPerPage,
        }),
      );
    } else {
      navigate('/');
    }
  }, [dispatch, navigate, searchTerm, currentPage, moviesPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = searchResult.slice(
    startIndex,
    startIndex + moviesPerPage,
  );

  return (
    <Container>
      <SearchTitle>&quot;{searchTerm}&quot; 검색 결과</SearchTitle>
      <SearchMovie>
        {currentMovies.map((movie: Movie) => (
          <Card
            key={movie.movieId}
            posterPath={movie.posterPath}
            movieNm={movie.title}
          />
        ))}
      </SearchMovie>
      <Pagination
        total={totalPages}
        current={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default SearchPage;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const SearchTitle = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: gray;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
export const SearchMovie = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 20px 0px 100px 180px;
`;
