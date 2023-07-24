package com.cinemaprincess.movie.repository;

import com.cinemaprincess.movie.entity.MovieDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Month;
import java.util.List;

public interface MovieDetailRepository extends JpaRepository<MovieDetail,Long> {
    @Query("SELECT md " +
            "FROM MovieDetail md " +
            "JOIN md.movieVote mv " +
            "WHERE SUBSTRING(md.releaseDate, 1, 4) = :year " +
            "AND mv.voteAverage >= 7 " +
            "AND mv.voteCount >= 100 " +
            "ORDER BY RAND()")
    List<MovieDetail> findByReleaseDateYear(String year, Pageable pageable);
}
