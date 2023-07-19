package com.cinemaprincess.utils;

public interface TmdbUrl {
    String buildMovieUrl(long movieId, String language);
    String buildMovieUrl(String startDate, String endDate, int page);
}
