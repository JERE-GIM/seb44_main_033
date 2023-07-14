package com.cinemaprincess.movie.mapper;

import com.cinemaprincess.genre.GenreDto;
import com.cinemaprincess.movie.dto.MovieDetailResponseDto;
import com.cinemaprincess.movie.dto.MovieDto;
import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.review.dto.ReviewResponseDto;
import com.cinemaprincess.review.repository.ReviewRepository;
import com.cinemaprincess.review.service.ReviewService;
import com.cinemaprincess.watch_provider.WatchProviderDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

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
        movieDetailResponseDto.releaseDate(movieDetail.getReleaseDate());
        movieDetailResponseDto.overview(movieDetail.getOverview());
        movieDetailResponseDto.runtime(movieDetail.getRuntime());
        movieDetailResponseDto.certification(movieDetail.getCertification());
        movieDetailResponseDto.actors(movieDetail.getActors());
        movieDetailResponseDto.director(movieDetail.getDirector());
        movieDetailResponseDto.videoPath(movieDetail.getVideoPath());

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
