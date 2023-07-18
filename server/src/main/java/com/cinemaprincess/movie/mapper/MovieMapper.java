package com.cinemaprincess.movie.mapper;

import com.cinemaprincess.genre.GenreDto;
import com.cinemaprincess.movie.dto.MovieDetailResponseDto;
import com.cinemaprincess.movie.dto.MovieDto;
import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.entity.MovieDetailGenre;
import com.cinemaprincess.movie.service.MovieService;
import com.cinemaprincess.movie.vote.MovieVoteDto;
import com.cinemaprincess.movie.watch_provider.WatchProviderDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MovieMapper {
    default MovieDetailResponseDto MovieDetailToMovieDetailResponseDto(MovieDetail movieDetail) {
        MovieDetailResponseDto.MovieDetailResponseDtoBuilder response = MovieDetailResponseDto.builder();

        response.movieId(movieDetail.getMovie().getMovieId());
        response.backdropPath(movieDetail.getBackdropPath());
        response.posterPath(movieDetail.getMovie().getPosterPath());
        response.title(movieDetail.getMovie().getTitle());
        response.releaseDate(movieDetail.getReleaseDate());
        response.overview(movieDetail.getOverview());
        response.runtime(movieDetail.getRuntime());
        response.certification(movieDetail.getCertification());
        response.actors(movieDetail.getActors());
        response.director(movieDetail.getDirector());
        response.videoPath(movieDetail.getVideoPath());

        MovieVoteDto.Response movieVoteDto = new MovieVoteDto.Response();
        movieVoteDto.setVoteAverage(movieDetail.getMovieVote().getVoteAverage());
        movieVoteDto.setVoteCount(movieDetail.getMovieVote().getVoteCount());
        response.movieVote(movieVoteDto);

//        List<ReviewResponseDto> reviewDtos = movieDetail.getReviews().stream()
//                .map(review -> {
//                    ReviewResponseDto reviewDto = new ReviewResponseDto();
//                    reviewDto.setReviewId(review.getReviewId());
//                    reviewDto.setUserId(review.getUser().getUserId());
//                    reviewDto.setMovieId(review.getMovieDetail().getMovie().getMovieId());
//                    reviewDto.setContent(review.getContent());
//                    reviewDto.setScore(review.getScore());
//                    reviewDto.setUsername(review.getUser().getUsername());
//                    reviewDto.setVotesCount(10);
//                    reviewDto.setCreatedAt(String.valueOf(review.getCreatedAt()));
//                    reviewDto.setModifiedAt(String.valueOf(review.getModifiedAt()));
//                    return reviewDto;
//                })
//                .collect(Collectors.toList());
//        movieDetailResponseDto.reviews(reviewDtos);

        List<GenreDto.Response> genreDtos = movieDetail.getMovieDetailGenres().stream()
                .map(movieDetailGenre -> {
                    GenreDto.Response genreDto = new GenreDto.Response();
                    genreDto.setGenreId(movieDetailGenre.getGenre().getGenreId());
                    genreDto.setGenreName(movieDetailGenre.getGenre().getGenreName());
                    return genreDto;
                })
                .collect(Collectors.toList());
        response.genres(genreDtos);

        List<WatchProviderDto.Response> watchProviders = movieDetail.getMovieDetailWatchProviders().stream()
                .map(movieDetailWatchProvider -> {
                    WatchProviderDto.Response watchProviderDto = new WatchProviderDto.Response();
                    watchProviderDto.setProviderId(movieDetailWatchProvider.getWatchProvider().getProviderId());
                    watchProviderDto.setProviderName(movieDetailWatchProvider.getWatchProvider().getProviderName());
                    watchProviderDto.setLogoPath(movieDetailWatchProvider.getWatchProvider().getLogoPath());
                    return watchProviderDto;
                })
                .collect(Collectors.toList());
        response.watchProviders(watchProviders);

        return response.build();
    }

    default MovieDto.Response movieToMovieResponseDto(Movie movie) {
        MovieDto.Response.ResponseBuilder response = MovieDto.Response.builder();

        response.movieId( movie.getMovieId() );
        response.posterPath( movie.getPosterPath() );
        response.title( movie.getTitle() );
        response.releaseDate(movie.getMovieDetail().getReleaseDate());

        return response.build();
    }

    List<MovieDto.Response> moviesToMovieResponseDtos(List<Movie> movies);
}
