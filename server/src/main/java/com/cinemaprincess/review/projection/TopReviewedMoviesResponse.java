package com.cinemaprincess.review.projection;

public interface TopReviewedMoviesResponse {
    String getTitle();
    String getPosterPath();
    String getReleaseDate();
    String getOverview();
    int getReviewCount();
}
