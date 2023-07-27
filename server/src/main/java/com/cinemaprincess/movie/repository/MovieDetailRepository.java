package com.cinemaprincess.movie.repository;

import com.cinemaprincess.movie.entity.MovieDetail;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieDetailRepository extends JpaRepository<MovieDetail, Long> {
    @Query("SELECT md " +
            "FROM MovieDetail md " +
            "JOIN md.movieVote mv " +
            "WHERE SUBSTRING(md.releaseDate, 1, 4) = :year " +
            "AND mv.voteAverage >= 7 " +
            "AND mv.voteCount >= 100 " +
            "ORDER BY RAND()")
    List<MovieDetail> findByReleaseDateYear(String year, Pageable pageable);

    @Query("select md from MovieDetail md join fetch md.movie")
    List<MovieDetail> findAll();
}
