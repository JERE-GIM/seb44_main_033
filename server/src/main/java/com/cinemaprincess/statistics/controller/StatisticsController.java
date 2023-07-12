package com.cinemaprincess.statistics.controller;

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
public class StatisticsController {

    //TODO: 결제 구현시 인터셉터 추가...

    /*
        DI
    */

    @GetMapping("/echo")
    public String echo (@RequestParam String message) {
        return message;
    }

    /*
    @GetMapping("/watchlists")
    public ResponseEntity getWatchlistsByPeriod() {
        return ResponseEntity.status(HttpStatus.OK).body(watchlistService.searchWatchlists);
    }

    @GetMapping("/reviews")
    public ResponseEntity getReviewsByPeriod() {
        return ResponseEntity.status(HttpStatus.OK).body(reviewService.searchReviews);
    }

    @GetMapping("/views")
    public ResponseEntity getViewsOfMoviesByPeriod() {
        return ResponseEntity.status(HttpStatus.OK).body(movieService.searchViewsOfMovies);
    }

    @GetMapping("/genres")
    public ResponseEntity getGenresByReleaseDate() {
        return ResponseEntity.status(HttpStatus.OK).body(genreService.searchGenres);
    }

    @GetMapping("/users")
    public ResponseEntity getUsersByPreference() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.searchUsers);
    }

    @GetMapping("/otts")
    public ResponseEntity getOttsByPeriod() {
        return ResponseEntity.status(HttpStatus.OK).body(ottService.searchOtts);
    }
    */

}