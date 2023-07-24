package com.cinemaprincess.genre.controller;

import com.cinemaprincess.genre.entity.Genre;
import com.cinemaprincess.genre.entity.GenreMap;
import com.cinemaprincess.genre.repository.GenreRepository;
import com.cinemaprincess.genre.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.List;


@RestController
@RequestMapping("/genres")
@RequiredArgsConstructor
public class GenreController {
    private final GenreService genreService;
    private final GenreRepository genreRepository;
    private final GenreMap genreMap;

    @PostMapping("/save")
    public ResponseEntity saveMovies() {
        genreService.getGenreList();

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostConstruct
    public void saveProviderMap() {
        List<Genre> genres = genreRepository.findAll();
        for (Genre genre : genres) {
            genreMap.addGenre(genre);
        }
    }
}
