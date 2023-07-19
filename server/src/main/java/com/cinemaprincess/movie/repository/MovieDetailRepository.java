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
    @Query(value = "SELECT md FROM MovieDetail md WHERE SUBSTRING(md.releaseDate, 6, 2) = :month AND SUBSTRING(md.releaseDate, 1, 4) = :year")
    List<MovieDetail> findByReleaseDateMonth(String year, String month, Pageable pageable);
}
