package com.cinemaprincess.statistics.controller;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.service.MovieService;
import com.cinemaprincess.review.entity.Review;
import com.cinemaprincess.review.service.ReviewService;
import com.cinemaprincess.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@Validated
@RequestMapping("/statistics")
public class StatisticsController {

    private final ReviewService reviewService;
    private final UserService userService;
    private final MovieService movieService;

    /*
        DI
    */
    public StatisticsController(ReviewService reviewService, UserService userService, MovieService movieService) {
        this.reviewService = reviewService;
        this.userService = userService;
        this.movieService = movieService;
    }

    //TODO: 결제 구현시 인터셉터 추가...


    /*
        사용자들의 연령별, 성별별 선호 장르 통계,
    */

    @GetMapping("/users")
    public ResponseEntity getUsersStatistics() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUsersStatistics());
    }

    /*
        일/주/월별 가장 많이 리뷰를 받은 영화들의 순위
    */
    @GetMapping("/reviews")
    public ResponseEntity getTopReviewedMovies(@RequestParam("period") String period) {
        return ResponseEntity.status(HttpStatus.OK).body(reviewService.searchMoviesWithReviewsByPeriod(period));
    }

    /*
        연도별 가장 많이 개봉된 장르 차트
    */
    /*
    @GetMapping("/genres")
    public ResponseEntity getGenresByReleaseDate() {
        return ResponseEntity.status(HttpStatus.OK).body(genreService.searchGenres);
    }
    */
/*
    @GetMapping("/watchlists")
    public ResponseEntity getWatchlistsByPeriod() {
        return ResponseEntity.status(HttpStatus.OK).body(watchlistService.searchWatchlists);
    }
*/
    /*


    @GetMapping("/views")
    public ResponseEntity getViewsOfMoviesByPeriod() {
        return ResponseEntity.status(HttpStatus.OK).body(movieService.searchViewsOfMovies);
    }

    @GetMapping("/otts")
    public ResponseEntity getOttsByPeriod() {
        return ResponseEntity.status(HttpStatus.OK).body(ottService.searchOtts);
    }
    */

}