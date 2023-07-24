package com.cinemaprincess.movie.vote;

import lombok.Getter;
import lombok.Setter;

public class MovieVoteDto {
    @Getter
    @Setter
    public static class Response {
        private float voteAverage;
        private int voteCount;
    }
}
