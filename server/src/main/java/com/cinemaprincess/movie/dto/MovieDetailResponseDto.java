package com.cinemaprincess.movie.dto;

import com.cinemaprincess.genre.GenreDto;
import com.cinemaprincess.movie.vote.MovieVote;
import com.cinemaprincess.movie.vote.MovieVoteDto;
import com.cinemaprincess.movie.watch_provider.WatchProviderDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

import java.util.List;

@Getter
@Setter
@Builder
public class MovieDetailResponseDto {
    private Long movieId;
    private String backdropPath;
    private String posterPath;
    private String title;
    private String releaseDate;
    private String overview;
    private Integer runtime;
    private String certification;
    private String director;
    private String actors;
    private String videoPath;
    private MovieVoteDto.Response movieVote;
    private List<GenreDto.Response> genres;
    private List<WatchProviderDto.Response> watchProviders;
    private List<MovieDto.Response> similarMovies;
    //private boolean watchlistCheck;
}
