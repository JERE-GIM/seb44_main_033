package com.cinemaprincess.review.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewResponseDto {
    private long reviewId;
    private long userId;
    private long movieId;
    private String movieTitle;
    private String content;
    private int score;
    private String username;
    private String posterPath;
    private int votesCount;
    private String createdAt;
    private String modifiedAt;
}
