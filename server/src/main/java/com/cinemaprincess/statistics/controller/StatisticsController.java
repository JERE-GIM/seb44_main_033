package com.cinemaprincess.statistics.controller;

import com.cinemaprincess.genre.service.GenreService;
import com.cinemaprincess.review.service.ReviewService;
import com.cinemaprincess.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@Validated
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final ReviewService reviewService;
    private final UserService userService;
    private final GenreService genreService;

    /*
        사용자들의 연령별, 성별별 선호 장르 통계
    */

    @GetMapping("/users")
    public ResponseEntity getUsersStatistics(@RequestParam("gender") String gender,
                                             @RequestParam("age") String age) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUsersStatistics(gender, age));
    }

    /*
        일/주/월별 가장 많이 리뷰를 받은 영화들의 순위
    */
    @GetMapping("/reviews")
    public ResponseEntity getTopReviewedMovies(@RequestParam("period") String period) {
        return ResponseEntity.status(HttpStatus.OK).body(reviewService.getMoviesWithReviewsByPeriod(period));
    }

    /*
        연도별 가장 많이 개봉된 장르 차트
    */
    @GetMapping("/genres")
    public ResponseEntity getGenresByYear(@RequestParam("year") int year) {
        return ResponseEntity.status(HttpStatus.OK).body(genreService.getGenresByYear(year));
    }

}
