package com.cinemaprincess.genre;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GenreRepository extends JpaRepository<Genre, Long> {
    Genre getGenreNameByGenreId(Long genreId);
}
