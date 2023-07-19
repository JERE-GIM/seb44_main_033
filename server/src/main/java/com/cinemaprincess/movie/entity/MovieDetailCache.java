package com.cinemaprincess.movie.entity;

import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class MovieDetailCache {
    private Map<Long, MovieDetail> movieDetailMap = new HashMap<>();

    public void addMovieDetail(MovieDetail movieDetail) {
        movieDetailMap.put(movieDetail.getId(), movieDetail);
    }

    public MovieDetail getMovieDetailById(Long movieId) {
        return movieDetailMap.get(movieId);
    }

    public Set<Long> getMovieDetailIds() {
        return movieDetailMap.keySet();
    }

    public List<MovieDetail> getMovieDetails() {
        return new ArrayList<>(movieDetailMap.values());
    }
}

