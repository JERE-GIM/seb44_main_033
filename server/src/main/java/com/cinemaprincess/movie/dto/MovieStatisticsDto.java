package com.cinemaprincess.movie.dto;

import com.cinemaprincess.movie.entity.MovieDetailGenre;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class MovieStatisticsDto {
    private List<MovieDetailGenre> movieDetailGenres;
}
