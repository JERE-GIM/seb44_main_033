package com.cinemaprincess.movie.dto;

import com.cinemaprincess.genre.Genre;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MovieDetailResponseDto {
    private long movieId;
    private String backdropPath;
    private String posterPath;
    private String title;
    private float voteAverage;
    private String releaseDate;
    private String overview;
    private Integer runtime;
    private String certification;
    private String director;
    private String actors;
    private String videoPath;
    private List<MovieDetailGenreDto.Response> movieDetailGenres;
}
