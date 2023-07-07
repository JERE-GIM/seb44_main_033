package com.cinemaprincess.movie.repository;

import com.cinemaprincess.movie.dto.MovieSearchDto;
import com.cinemaprincess.movie.dto.MovieSearchResultDto;
import com.cinemaprincess.movie.entity.Movie;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query(value = "SELECT m FROM Movie m WHERE m.title like %:keyword%")
    List<MovieSearchResultDto> findByKeyword(@Param("keyword") String keyword, Pageable pageable);
/*
    @Query("SELECT m FROM Movie WHERE m.title like %:keyword% AND m.genre = :genre")
    List<MovieSearchDto> findByKeywordAndGenre(@Param("keyword") String keyword,
                                             @Param("genre")String genre);

*/
}