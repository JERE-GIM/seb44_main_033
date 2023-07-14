package com.cinemaprincess.movie.service;

import com.cinemaprincess.exception.BusinessLogicException;
import com.cinemaprincess.exception.ExceptionCode;
import com.cinemaprincess.movie.entity.Movie;
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

            int size = 16;
            Map<Long, Optional<Movie>> upcomingMovies = new HashMap<>();
            for (int i = 0; i < size; i++) {
                JsonObject resultsObject = resultsArray.get(i).getAsJsonObject();
                upcomingMovies.put(resultsObject.get("id").getAsLong(), movieRepository.findById(resultsObject.get("id").getAsLong()));
            }

            for (Optional<Movie> value : upcomingMovies.values()) {
                if(value.isEmpty()) {

                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new PageImpl<>(movies);
    }

    public Movie findMovie(Long movieId) {
        return findVerifiedMovie(movieId);
    }

    private Movie findVerifiedMovie(Long movieId) {
        Optional<Movie> optional = movieRepository.findById(movieId);
        Movie findMovie = optional
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOVIE_NOT_FOUND));

        return findMovie;
    }
}
