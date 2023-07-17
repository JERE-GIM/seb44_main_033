package com.cinemaprincess.movie.repository;

import com.cinemaprincess.movie.entity.MovieDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieDetailRepository extends JpaRepository<MovieDetail,Long> {
}
