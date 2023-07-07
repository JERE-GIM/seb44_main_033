package com.cinemaprincess.review.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewResponseDto {
    private long reviewId;
    private long userId;
    private long id;
    private String content;
    private int score;
    private String createdAt;
    private String modifiedAt;
}
