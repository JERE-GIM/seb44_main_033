package com.cinemaprincess.movie.controller;

import com.cinemaprincess.movie.mapper.MovieMapper;
import com.cinemaprincess.movie.service.MovieService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/movies")
public class MovieController {
    private final static String MOVIE_DEFAULT_URL = "/movies";
    private final MovieService movieService;
    private final MovieMapper movieMapper;

    public MovieController(MovieService movieService, MovieMapper movieMapper) {
        this.movieService = movieService;
        this.movieMapper = movieMapper;
    }

    // 영화 상세조회
    @GetMapping("/{movie-id}")
    public ResponseEntity getMovie(@PathVariable("movie-id") @Positive long movieId) {

    }
}

