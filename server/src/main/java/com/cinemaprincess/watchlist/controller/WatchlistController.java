package com.cinemaprincess.watchlist.controller;

import com.cinemaprincess.watchlist.dto.WatchlistDto;
import com.cinemaprincess.watchlist.service.WatchlistService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users/mypage/watchlist")
public class WatchlistController {
    private final WatchlistService watchlistService;

    // Watchlist Movie 추가
    @PostMapping("/{user-id}/{movie-id}")
    public ResponseEntity postWatchlist(@PathVariable("user-id") @Positive Long userId,
                                        @PathVariable("movie-id") @Positive Long movieId) {
        watchlistService.addMovieToWatchlist(userId, movieId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Watchlist 조회
    @GetMapping("/{user-id}")
    public ResponseEntity getWatchList(@PathVariable("user-id") @Positive Long userId) {
        WatchlistDto watchlistDto = watchlistService.findUserWatchlist(userId);

        return new ResponseEntity(watchlistDto, HttpStatus.OK);
    }

    // Watchlist Movie 개별 삭제
    @DeleteMapping("/{user-id}/{movie-id}")
    public ResponseEntity deleteWatchList(@PathVariable("user-id") @Positive Long userId,
                                          @PathVariable("movie-id") @Positive Long movieId) {
        watchlistService.deleteMovieFromWatchlist(userId, movieId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
    }

    // Watchlist Movie 전체 삭제
    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteAllWatchList(@PathVariable("user-id") @Positive Long userId) {
        watchlistService.deleteAllMovieFromWatchlist(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204
    }
}
