package com.cinemaprincess.review.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewResponseDto {
    private long reviewId;
    private String content;
    private int score;
    private String createdAt;
    private String updatedAt;
}
