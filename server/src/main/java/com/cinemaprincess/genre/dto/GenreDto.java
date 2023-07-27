package com.cinemaprincess.genre.dto;

import lombok.Getter;
import lombok.Setter;

public class GenreDto {
    @Getter
    @Setter
    public static class Response {
        private long genreId;
        private String genreName;
    }
}
