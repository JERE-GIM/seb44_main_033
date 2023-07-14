package com.cinemaprincess.movie.mapper;

import com.cinemaprincess.genre.GenreDto;
import com.cinemaprincess.movie.dto.MovieDetailResponseDto;
import com.cinemaprincess.movie.dto.MovieDto;
import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.watch_provider.WatchProviderDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

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

        List<GenreDto.Response> genreDtos = movieDetail.getMovieDetailGenres().stream()
                .map(movieDetailGenre -> {
                    GenreDto.Response genreDto = new GenreDto.Response();
                    genreDto.setGenreId(movieDetailGenre.getGenre().getGenreId());
                    genreDto.setGenreName(movieDetailGenre.getGenre().getGenreName());
                    return genreDto;
                })
                .collect(Collectors.toList());
        movieDetailResponseDto.genres(genreDtos);

        List<WatchProviderDto.Response> watchProviders = movieDetail.getMovieDetailWatchProviders().stream()
                .map(movieDetailWatchProvider -> {
                    WatchProviderDto.Response watchProviderDto = new WatchProviderDto.Response();
                    watchProviderDto.setProviderId(movieDetailWatchProvider.getWatchProvider().getProviderId());
                    watchProviderDto.setProviderName(movieDetailWatchProvider.getWatchProvider().getProviderName());
                    watchProviderDto.setLogoPath(movieDetailWatchProvider.getWatchProvider().getLogoPath());
                    return watchProviderDto;
                })
                .collect(Collectors.toList());
        movieDetailResponseDto.watchProviders(watchProviders);

        return movieDetailResponseDto.build();
    }

    MovieDto.Response movieToMovieResponseDto(Movie movie);

    List<MovieDto.Response> moviesToMovieResponseDtos(List<Movie> movies);
}
