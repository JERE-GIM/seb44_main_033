package com.cinemaprincess.watchlist.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MovieDto {
    private Long watchlistId;
    private Long movieId;
    private LocalDateTime createdAt;
}
