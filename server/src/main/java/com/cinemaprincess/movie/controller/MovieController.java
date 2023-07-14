package com.cinemaprincess.movie.controller;

import com.cinemaprincess.movie.dto.MovieDetailResponseDto;
import com.cinemaprincess.movie.dto.MovieDto;
import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.mapper.MovieMapper;
import com.cinemaprincess.movie.save.SaveMovieDetail;
import com.cinemaprincess.movie.service.MovieService;
import com.cinemaprincess.response.MultiResponseDto;
import com.cinemaprincess.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {
    private final static String MOVIE_DEFAULT_URL = "/movies";
    private final MovieService movieService;
    private final MovieMapper movieMapper;
    private final SaveMovieDetail saveMovieDetail;

    // 영화 상세조회
    @GetMapping("/{movie-id}")
    public ResponseEntity getMovie(@PathVariable("movie-id") long movieId) {
        MovieDetail movieDetail = saveMovieDetail.getMovieDetail(movieId);
        MovieDetailResponseDto movieDetailResponseDto = movieMapper.MovieDetailToMovieDetailResponseDto(movieDetail);

        return new ResponseEntity<>(new SingleResponseDto<>(movieDetailResponseDto), HttpStatus.OK);
    }

    @GetMapping("/upcoming")
    public ResponseEntity getUpcomingMovie() {
        Page<Movie> pageMovies = movieService.findUpcomingMovies();
        List<Movie> movies =pageMovies.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(movieMapper.moviesToMovieResponseDtos(movies),pageMovies), HttpStatus.OK);
    }
}

