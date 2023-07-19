package com.cinemaprincess.review.dto;

import lombok.Data;

@Data
public class ReviewVoteDto {
    private boolean reviewVoteStatus;
    private int totalVoteCount;
}
