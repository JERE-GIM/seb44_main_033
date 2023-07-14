package com.cinemaprincess.movie.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class MovieDto {
    @Getter
    @Builder
    public static class Response {
        private long movieId;
        private String posterPath;
        private String title;
    }
}
