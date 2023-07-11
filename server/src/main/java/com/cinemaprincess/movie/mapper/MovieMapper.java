package com.cinemaprincess.movie.mapper;

import com.cinemaprincess.movie.dto.MovieDetailResponseDto;
import com.cinemaprincess.movie.entity.MovieDetail;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MovieMapper {
    default MovieDetailResponseDto MovieDetailToMovieDetailResponseDto(MovieDetail movieDetail) {
        MovieDetailResponseDto.MovieDetailResponseDtoBuilder movieDetailResponseDto = MovieDetailResponseDto.builder();

        movieDetailResponseDto.movieId(movieDetail.getMovie().getMovieId());
        movieDetailResponseDto.backdropPath(movieDetail.getBackdropPath());
        movieDetailResponseDto.posterPath(movieDetail.getMovie().getPosterPath());
        movieDetailResponseDto.title(movieDetail.getMovie().getTitle());
        movieDetailResponseDto.voteAverage(movieDetail.getMovie().getVoteAverage());
        movieDetailResponseDto.releaseDate(movieDetail.getMovie().getReleaseDate());
        movieDetailResponseDto.overview(movieDetail.getOverview());
        movieDetailResponseDto.runtime(movieDetail.getRuntime());
        movieDetailResponseDto.certification(movieDetail.getCertification());
        movieDetailResponseDto.actors(movieDetail.getActors());
        movieDetailResponseDto.director(movieDetail.getDirector());
        movieDetailResponseDto.videoPath(movieDetail.getVideoPath());
        return movieDetailResponseDto.build();
    }
}
