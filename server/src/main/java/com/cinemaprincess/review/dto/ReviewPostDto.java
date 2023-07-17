package com.cinemaprincess.review.dto;

import lombok.Getter;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;

@Getter
public class ReviewPostDto {
    private String content;
    @Range(min = 1, max = 10)
    private int score;
    private long movieId;
    private long userId;
}
