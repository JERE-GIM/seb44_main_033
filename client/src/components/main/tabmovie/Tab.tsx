import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchUpcoming, Movie } from '../../../api/getUpcoming';
import { fetchNew } from '../../../api/getNew';
import { fetchPopular } from '../../../api/getPopular';
import TabSlider from './Tabslider';
import TabCard from './TabCard';
import {
  TabContainer,
  TabMenuContainer,
  TabItem,
  TabContentContainer,
} from '../../../styles/components/main/tabmovie/Tab.styled';
import { Link } from 'react-router-dom';

export default function TabMenu() {
  const [activeTab, setActiveTab] = useState('신작');
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.tabmovie.movies);

  useEffect(() => {
    if (activeTab === '신작') {
      dispatch(fetchNew());
    } else if (activeTab === '인기') {
      dispatch(fetchPopular());
    } else if (activeTab === '개봉예정') {
      dispatch(fetchUpcoming());
    }
  }, [activeTab]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  // 날짜 순으로 정렬하는 함수
  const sortByReleaseDate = (movies: Movie[]): Movie[] => {
    return movies.slice().sort((a, b) => {
      const dateA = new Date(a.releaseDate).getTime();
      const dateB = new Date(b.releaseDate).getTime();
      return dateA - dateB;
    });
  };

  // movies 배열을 업데이트
  const sortedMovies = sortByReleaseDate(movies);

  return (
    <TabContainer>
      <TabMenuContainer>
        <TabItem
          isActive={activeTab === '신작'}
          onClick={() => handleTabClick('신작')}
        >
          신작
        </TabItem>
        <TabItem
          isActive={activeTab === '인기'}
          onClick={() => handleTabClick('인기')}
        >
          인기
        </TabItem>
        <TabItem
          isActive={activeTab === '개봉예정'}
          onClick={() => handleTabClick('개봉예정')}
        >
          개봉예정
        </TabItem>
      </TabMenuContainer>
      <TabContentContainer>
        <TabSlider key={activeTab}>
          {/*  upcomingMovies 배열을 사용하여 개봉예정 영화만 렌더링, 날짜순! */}
          {activeTab === '개봉예정'
            ? sortedMovies.map((movie: Movie) => (
                <Link to={`/movie/${movie.movieId}`} key={movie.movieId}>
                  <TabCard
                    posterPath={movie.posterPath}
                    title={movie.title}
                    releaseDate={movie.releaseDate}
                  />
                </Link>
              ))
            : movies.map((movie: Movie) => (
                <Link to={`/movie/${movie.movieId}`} key={movie.movieId}>
                  <TabCard
                    posterPath={movie.posterPath}
                    title={movie.title}
                    releaseDate={movie.releaseDate.split('-')[0]}
                  />
                </Link>
              ))}
        </TabSlider>
      </TabContentContainer>
    </TabContainer>
  );
}
