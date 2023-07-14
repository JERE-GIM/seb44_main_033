package com.cinemaprincess.movie.service;

import com.cinemaprincess.exception.BusinessLogicException;
import com.cinemaprincess.exception.ExceptionCode;
import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.repository.MovieDetailRepository;
import com.cinemaprincess.movie.repository.MovieJdbcRepository;
import com.cinemaprincess.movie.repository.MovieRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final MovieDetailRepository movieDetailRepository;
    private final MovieJdbcRepository movieJdbcRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    public String buildUpcomingMovieUrl() {
        String key = "8799558ac2f2609cd5ff89aa63a87f10";
        return UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/movie/upcoming")
                .queryParam("api_key", key)
                .queryParam("language", "ko")
                .queryParam("region", "kr")
                .build()
                .toUriString();
    }

    public Page<Movie> findUpcomingMovies() {
        List<Movie> movies = new ArrayList<>();

        try {
            String url = buildUpcomingMovieUrl();
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
            String responseBody = response.getBody();

            JsonParser jsonParser = new JsonParser();
            JsonObject jsonObject = jsonParser.parse(responseBody).getAsJsonObject();
            JsonArray resultsArray = jsonObject.getAsJsonArray("results");



        } catch (Exception e) {
            e.printStackTrace();
        }

        return new PageImpl<>(movies);
    }

    public MovieDetail findMovie(Long movieId) {
        return findVerifiedMovie(movieId);
    }

    private MovieDetail findVerifiedMovie(Long movieId) {
        Optional<MovieDetail> optional = movieDetailRepository.findById(movieId);

        return optional
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOVIE_NOT_FOUND));
    }
}
