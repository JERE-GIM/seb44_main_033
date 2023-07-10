package com.cinemaprincess.review.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class ReviewPostDto {
    private String content;
    private int score;
    @NotNull
    private long id;
    private long userId;
}
