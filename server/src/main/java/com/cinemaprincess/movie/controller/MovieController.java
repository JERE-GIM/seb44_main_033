package com.cinemaprincess.movie.controller;

import com.cinemaprincess.movie.dto.MovieDetailResponseDto;
import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.mapper.MovieMapper;
import com.cinemaprincess.movie.save.SaveMovieDetail;
import com.cinemaprincess.movie.service.MovieService;
import com.cinemaprincess.response.MovieMultiResponseDto;
import com.cinemaprincess.response.MultiResponseDto;
import com.cinemaprincess.response.SingleResponseDto;
import com.cinemaprincess.review.dto.ReviewResponseDto;
import com.cinemaprincess.review.repository.ReviewRepository;
import com.cinemaprincess.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {
    private final static String MOVIE_DEFAULT_URL = "/movies";
    private final MovieService movieService;
    private final MovieMapper movieMapper;
    private final SaveMovieDetail saveMovieDetail;
    private final ReviewRepository reviewRepository;
    private final ReviewService reviewService;

    // 영화 상세조회
    @GetMapping("/{movie-id}")
    public ResponseEntity getMovie(@PathVariable("movie-id") long movieId,
                                   @RequestParam(value = "page", defaultValue = "1") int page) {
        MovieDetail movieDetail = movieService.findMovie(movieId);
        Page<ReviewResponseDto> reviewPage = reviewService.findReviewsByMovieId(movieId, page - 1);
        List<ReviewResponseDto> responseDtos = reviewPage.getContent();

        MovieDetailResponseDto movieDetailResponseDto = movieMapper.MovieDetailToMovieDetailResponseDto(movieDetail);

        return new ResponseEntity<>(new MovieMultiResponseDto<>(movieDetailResponseDto, responseDtos, reviewPage), HttpStatus.OK);
    }

    // 개봉 예정
    @GetMapping("/upcoming")
    public ResponseEntity getUpcomingMovie() {
        Page<Movie> pageMovies = movieService.findUpcomingMovies();
        List<Movie> movies =pageMovies.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(movieMapper.moviesToMovieResponseDtos(movies),pageMovies), HttpStatus.OK);
    }
}

