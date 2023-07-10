package com.cinemaprincess.movie.controller;

import com.cinemaprincess.movie.mapper.MovieMapper;
import com.cinemaprincess.movie.service.MovieService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

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

    @GetMapping
    public String getMovies() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<?> entity = new HttpEntity<>(httpHeaders);

        String tmdbUrl = "https://api.themoviedb.org/3/discover/movie?api_key=8799558ac2f2609cd5ff89aa63a87f10&release_date.gte=1950-01-01&watch_region=KR&language=ko-KR";

        UriComponents uri = UriComponentsBuilder.fromHttpUrl(tmdbUrl).build();

        ResponseEntity<String> response = restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, String.class);

        return response.getBody();
    }
}

