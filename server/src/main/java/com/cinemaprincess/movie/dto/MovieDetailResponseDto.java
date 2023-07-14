package com.cinemaprincess.movie.dto;

import com.cinemaprincess.genre.Genre;
import com.cinemaprincess.genre.GenreDto;
import com.cinemaprincess.review.dto.ReviewResponseDto;
import com.cinemaprincess.review.entity.Review;
import com.cinemaprincess.watch_provider.WatchProviderDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MovieDetailResponseDto {
    private Long movieId;
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
    private List<GenreDto.Response> genres;
    private List<WatchProviderDto.Response> watchProviders;
//    private List<ReviewResponseDto> reviews;
}
