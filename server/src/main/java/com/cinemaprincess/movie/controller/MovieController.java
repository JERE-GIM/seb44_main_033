package com.cinemaprincess.movie.controller;

import com.cinemaprincess.movie.dto.MovieDetailResponseDto;
import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.mapper.MovieMapper;
import com.cinemaprincess.movie.save.SaveKoreaMovie;
import com.cinemaprincess.movie.save.SaveLatestMovie;
import com.cinemaprincess.movie.save.SaveMovieList;
import com.cinemaprincess.movie.service.MovieService;
import com.cinemaprincess.response.MovieMultiResponseDto;
import com.cinemaprincess.response.SingleResponseDto;
import com.cinemaprincess.review.dto.ReviewResponseDto;
import com.cinemaprincess.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;
    private final MovieMapper movieMapper;
    private final ReviewService reviewService;
    private final SaveMovieList saveMovieList;
    private final SaveKoreaMovie saveKoreaMovie;
    private final SaveLatestMovie saveLatestMovie;

    // 영화 상세조회
    @GetMapping("/{movie-id}")
    public ResponseEntity getMovie(@PathVariable("movie-id") long movieId,
                                   @RequestParam(value = "page", defaultValue = "1") int page) {
        boolean watchlistCheck = movieService.findWatchlistMovie(movieId);

        MovieDetail movieDetail = movieService.findMovie(movieId);
        Page<ReviewResponseDto> reviewPage = reviewService.findReviewsByMovieId(movieId, page - 1);
        List<ReviewResponseDto> responseDtos = reviewPage.getContent();

        MovieDetailResponseDto movieDetailResponseDto = movieMapper.MovieDetailToMovieDetailResponseDto(movieDetail);
        movieDetailResponseDto.setSimilarMovies(movieService.getSimilarMovies(movieId));
        movieDetailResponseDto.setWatchlistCheck(watchlistCheck);

        return new ResponseEntity<>(new MovieMultiResponseDto<>(movieDetailResponseDto, responseDtos, reviewPage), HttpStatus.OK);
    }

    // 로그인 이후에 영화 상세조회
    @GetMapping("/{movie-id}/{user-id}")
    public ResponseEntity getMovie(@PathVariable("movie-id") long movieId,
                                   @PathVariable("user-id") long userId,
                                   @RequestParam(value = "page", defaultValue = "1") int page) {
        boolean watchlistCheck = movieService.findWatchlistMovie(movieId);

        MovieDetail movieDetail = movieService.findMovie(movieId);
        Page<ReviewResponseDto> reviewPage = reviewService.findReviewsByMovieId(movieId, page - 1);
        List<ReviewResponseDto> responseDtos = reviewPage.getContent();

        // 각 리뷰에 대한 좋아요 여부 확인 및 응답에 반영
        for (ReviewResponseDto reviewDto : responseDtos) {
            boolean isLiked = reviewService.checkReviewLikeStatus(reviewDto.getReviewId(), userId);
            reviewDto.setReviewVoted(isLiked); // reviewVoted 필드에 좋아요 여부 값을 설정
        }

        MovieDetailResponseDto movieDetailResponseDto = movieMapper.MovieDetailToMovieDetailResponseDto(movieDetail);
        movieDetailResponseDto.setSimilarMovies(movieService.getSimilarMovies(movieId));
        movieDetailResponseDto.setWatchlistCheck(watchlistCheck);

        return new ResponseEntity<>(new MovieMultiResponseDto<>(movieDetailResponseDto, responseDtos, reviewPage), HttpStatus.OK);
    }

    // 신작
    @GetMapping("/new")
    public ResponseEntity getNewMovies() {
        List<Movie> movies = movieService.findMovieListByKeyword("now_playing", (int) (Math.random() * 3) + 1);

        return new ResponseEntity<>(
                new SingleResponseDto<>(movieMapper.moviesToMovieResponseDtos(movies)), HttpStatus.OK);
    }

    // 인기작
    @GetMapping("/popular")
    public ResponseEntity getPopularMovies() {
        List<Movie> movies = movieService.findMovieListByKeyword("top_rated", (int) (Math.random() * 50) + 1);

        return new ResponseEntity<>(
                new SingleResponseDto<>(movieMapper.moviesToMovieResponseDtos(movies)), HttpStatus.OK);
    }

    // 개봉 예정
    @GetMapping("/upcoming")
    public ResponseEntity getUpcomingMovies() {
        List<Movie> movies = movieService.findMovieListByKeyword("upcoming", 1);

        return new ResponseEntity<>(
                new SingleResponseDto<>(movieMapper.moviesToMovieResponseDtos(movies)), HttpStatus.OK);
    }

    @GetMapping("/yearly")
    public ResponseEntity getMonthlyMovies() {
        List<Movie> movies = movieService.findYearlyMovies();

        return new ResponseEntity<>(
                new SingleResponseDto<>(movieMapper.moviesToMovieResponseDtos(movies)), HttpStatus.OK);
    }

    // 영화 업데이트
    @PostMapping("/save")
    public ResponseEntity saveMovies() {
        String start = LocalDate.now().toString();
        saveLatestMovie.setDateMap(start, "2023-12-31");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // DB 초기 저장
    @PostMapping("/init")
    public ResponseEntity initialize() {
        saveMovieList.setDateMap("1950-01-01", "2023-12-31");
        saveKoreaMovie.setDateMap("1950-01-01", "2023-12-31");
        saveLatestMovie.setDateMap("2023-01-01", "2023-12-31");

        return new ResponseEntity<>(HttpStatus.OK);
    }
}

