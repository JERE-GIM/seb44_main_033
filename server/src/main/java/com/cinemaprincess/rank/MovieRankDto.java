package com.cinemaprincess.rank;

import lombok.Data;

@Data
public class MovieRankDto {
    private String rank;
    private String movieNm;
    private String openDt;
    private String audiAcc;
    private String posterPath;
    private String movieId;
}
