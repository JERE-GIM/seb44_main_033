package com.cinemaprincess.movie.save;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.repository.MovieJdbcRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Component
public class SaveMovieList implements SaveMovieInterface {
    @Override
    public String buildMovieListUrl(String startDate, String endDate, int page) {
        return UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/discover/movie")
                .queryParam("api_key", key)
                .queryParam("primary_release_date.gte", startDate)
                .queryParam("primary_release_date.lte", endDate)
                .queryParam("language", "ko")
                .queryParam("page", page)
                .build()
                .toUriString();
    }

    @Override
    public void getMovieList(MovieJdbcRepository movieJdbcRepository) {
        SaveMovieInterface.super.getMovieList(movieJdbcRepository);
    }

    @Override
    public void setDateMap(MovieJdbcRepository movieJdbcRepository) {
        SaveMovieInterface.super.setDateMap(movieJdbcRepository);
    }

    @Override
    public List<Movie> parseMovieList(String responseBody) {
        return SaveMovieInterface.super.parseMovieList(responseBody);
    }

    @Override
    public int getPages(String startDate, String endDate) {
        return SaveMovieInterface.super.getPages(startDate, endDate);
    }
}

