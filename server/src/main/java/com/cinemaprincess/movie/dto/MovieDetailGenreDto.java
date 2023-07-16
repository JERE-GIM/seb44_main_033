package com.cinemaprincess.movie.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MovieDetailGenreDto {
    public static class Response {
        private long genreId;
        private String genreName;
    }
}
