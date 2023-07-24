package com.cinemaprincess.movie.save;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.repository.MovieJdbcRepository;
import com.cinemaprincess.utils.RestTemplateConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Slf4j
@Transactional
public class SaveKoreaMovie extends SaveMovieList {
    public SaveKoreaMovie(MovieJdbcRepository movieJdbcRepository, SaveMovieDetail saveMovieDetail, RestTemplateConfig restTemplateConfig) {
        super(movieJdbcRepository, saveMovieDetail, restTemplateConfig);
    }

    @Override
    public String buildMovieListUrl(String startDate, String endDate, int page) {
        return UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/discover/movie")
                .queryParam("api_key", key)
                .queryParam("primary_release_date.gte", startDate)
                .queryParam("primary_release_date.lte", endDate)
                .queryParam("with_original_language", "ko")
                .queryParam("language", "ko")
                .queryParam("page", page)
                .build()
                .toUriString();
    }

    @Override
    public void getMovieList() {
        super.getMovieList();
    }

    @Override
    public List<Movie> parseMovieList(String responseBody) {
        return super.parseMovieList(responseBody);
    }

    @Override
    public void setDateMap(String start, String end) {
        super.setDateMap(start, end);
    }

    @Override
    public int getPages(String startDate, String endDate) {
        return super.getPages(startDate, endDate);
    }
}