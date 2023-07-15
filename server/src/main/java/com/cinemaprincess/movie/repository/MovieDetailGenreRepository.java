package com.cinemaprincess.movie.repository;

import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.entity.MovieDetailGenre;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface MovieDetailGenreRepository extends JpaRepository<MovieDetailGenre, Long> {
    @Query(value = "SELECT mdg.movieDetail FROM MovieDetailGenre mdg " +
            "WHERE mdg.genre.genreId = :genreId AND mdg.movieDetail.id <> :movieId")
    List<MovieDetail> findSimilarMovieDetails(@Param("genreId") long genreId, @Param("movieId") long movieId, Pageable pageable);
}
