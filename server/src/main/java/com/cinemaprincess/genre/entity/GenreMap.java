package com.cinemaprincess.genre.entity;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class GenreMap {
    private Map<Long, Genre> genreMap = new HashMap<>();

    public void addGenre(Genre genre) {
        genreMap.put(genre.getGenreId(), genre);
    }

    public Genre getGenreById(Long genreId) {
        return genreMap.get(genreId);
    }
}
