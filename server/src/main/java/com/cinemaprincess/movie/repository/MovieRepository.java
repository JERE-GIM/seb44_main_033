package com.cinemaprincess.movie.repository;

import com.cinemaprincess.movie.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
