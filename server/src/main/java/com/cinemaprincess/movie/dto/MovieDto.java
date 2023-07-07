package com.cinemaprincess.movie.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MovieDto {

    String title;

    @Getter
    @Builder
    public static class Response {

    }
}
