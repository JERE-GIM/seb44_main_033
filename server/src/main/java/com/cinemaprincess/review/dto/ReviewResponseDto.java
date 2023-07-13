package com.cinemaprincess.review.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewResponseDto {
    private long reviewId;
    private long userId;
    private long movieId;
    private String content;
    private int score;
    private String username;
    private int votesCount;
    private String createdAt;
    private String modifiedAt;
}
