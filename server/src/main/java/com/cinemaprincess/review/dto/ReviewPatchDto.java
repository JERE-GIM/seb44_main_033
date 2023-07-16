package com.cinemaprincess.review.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewPatchDto {
    private long reviewId;
    private String content;
    private int score;
}
