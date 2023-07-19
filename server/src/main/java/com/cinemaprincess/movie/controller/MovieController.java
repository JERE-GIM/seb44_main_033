package com.cinemaprincess.movie.controller;

import com.cinemaprincess.genre.GenreService;
import com.cinemaprincess.movie.dto.MovieDetailResponseDto;
import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.mapper.MovieMapper;
import com.cinemaprincess.movie.save.SaveKoreaMovie;
import com.cinemaprincess.movie.save.SaveLatestMovie;
import com.cinemaprincess.movie.save.SaveMovieDetail;
import com.cinemaprincess.movie.save.SaveMovieList;
import com.cinemaprincess.movie.service.MovieService;
import com.cinemaprincess.movie.vote.SaveMovieVote;
import com.cinemaprincess.movie.watch_provider.WatchProviderService;
import com.cinemaprincess.response.MovieMultiResponseDto;
import com.cinemaprincess.response.SingleResponseDto;
import com.cinemaprincess.review.dto.ReviewResponseDto;
import com.cinemaprincess.review.repository.ReviewRepository;
import com.cinemaprincess.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;
    private final MovieMapper movieMapper;
    private final SaveMovieDetail saveMovieDetail;
    private final ReviewRepository reviewRepository;
    private final ReviewService reviewService;
    private final SaveMovieList saveMovieList;
    private final SaveKoreaMovie saveKoreaMovie;
    private final SaveLatestMovie saveLatestMovie;

    //    private final SaveKoreaMovie saveKoreaMovie;
//    private final SaveLatestMovie saveLatestMovie;
    private final SaveMovieVote movieVote;
    private final GenreService genreService;
    private final WatchProviderService watchProviderService;

    // 영화 상세조회
    @GetMapping("/{movie-id}")
    public ResponseEntity getMovie(@PathVariable("movie-id") long movieId,
                                   @RequestParam(value = "page", defaultValue = "1") int page) {
        MovieDetail movieDetail = movieService.findMovie(movieId);
        Page<ReviewResponseDto> reviewPage = reviewService.findReviewsByMovieId(movieId, page - 1);
        List<ReviewResponseDto> responseDtos = reviewPage.getContent();

        MovieDetailResponseDto movieDetailResponseDto = movieMapper.MovieDetailToMovieDetailResponseDto(movieDetail);
        movieDetailResponseDto.setSimilarMovies(movieService.getSimilarMovies(movieId));

        return new ResponseEntity<>(new MovieMultiResponseDto<>(movieDetailResponseDto, responseDtos, reviewPage), HttpStatus.OK);
    }

    // 신작
    @GetMapping("/new")
    public ResponseEntity getNewMovies() {
        List<Movie> movies = movieService.findMovieListByKeyword("now_playing");

        return new ResponseEntity<>(
                new SingleResponseDto<>(movieMapper.moviesToMovieResponseDtos(movies)), HttpStatus.OK);
    }

    // 인기작
    @GetMapping("/popular")
    public ResponseEntity getPopularMovies() {
        List<Movie> movies = movieService.findMovieListByKeyword("top_rated");

        return new ResponseEntity<>(
                new SingleResponseDto<>(movieMapper.moviesToMovieResponseDtos(movies)), HttpStatus.OK);
    }

    // 개봉 예정
    @GetMapping("/upcoming")
    public ResponseEntity getUpcomingMovies(@Positive @RequestParam int page,
                                           @Positive @RequestParam int size) {
        Page<Movie> pageMovies = movieService.findMovieListByKeyword(page - 1, size, "upcoming");
        List<Movie> movies = pageMovies.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(movieMapper.moviesToMovieResponseDtos(movies), pageMovies), HttpStatus.OK);
    }

    @GetMapping("/new")
    public ResponseEntity getNewMovies(@Positive @RequestParam int page,
                                           @Positive @RequestParam int size) {
        Page<Movie> pageMovies = movieService.findMovieListByKeyword(page - 1, size, "now_playing");
        List<Movie> movies = pageMovies.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(movieMapper.moviesToMovieResponseDtos(movies), pageMovies), HttpStatus.OK);
    }

    @GetMapping("/popular")
    public ResponseEntity getPopularMovies(@Positive @RequestParam int page,
                                           @Positive @RequestParam int size) {
        Page<Movie> pageMovies = movieService.findMovieListByKeyword(page - 1, size, "top_rated");
        List<Movie> movies = pageMovies.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(movieMapper.moviesToMovieResponseDtos(movies), pageMovies), HttpStatus.OK);
    }

    @GetMapping("/monthly")
    public ResponseEntity getMonthlyMovies() {
        List<Movie> movies = movieService.findMonthlyMovies();

        return new ResponseEntity<>(
    public ResponseEntity getUpcomingMovies() {
        List<Movie> movies = movieService.findMovieListByKeyword("upcoming");

        return new ResponseEntity<>(
                new SingleResponseDto<>(movieMapper.moviesToMovieResponseDtos(movies)), HttpStatus.OK);
    }

    @GetMapping("/monthly")
    public ResponseEntity getMonthlyMovies() {
        List<Movie> movies = movieService.findMonthlyMovies();

        return new ResponseEntity<>(
                new SingleResponseDto<>(movieMapper.moviesToMovieResponseDtos(movies)), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity initialize() {
        genreService.getGenreList();
        watchProviderService.getProviderList();
        saveMovieList.setDateMap();
//        saveKoreaMovie.setDateMap();
//        saveLatestMovie.setDateMap();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/save/vote")
    public ResponseEntity saveVote() {
        movieVote.getMovieVote();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

