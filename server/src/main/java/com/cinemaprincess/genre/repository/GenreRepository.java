package com.cinemaprincess.genre.repository;

import com.cinemaprincess.genre.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}
