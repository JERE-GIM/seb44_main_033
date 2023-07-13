package com.cinemaprincess.review.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class ReviewPostDto {
    private String content;
    private int score;
    private long movieId;
    private long userId;
}
