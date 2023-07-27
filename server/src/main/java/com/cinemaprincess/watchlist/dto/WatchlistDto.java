package com.cinemaprincess.watchlist.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class WatchlistDto {
        private Long watchlistId;
        private LocalDateTime createdAt;
        private Long userId;
        private int count;
        private List<MovieDto> watchlistMovies;
}
