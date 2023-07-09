package com.cinemaprincess.movie.dto;

import lombok.Getter;

@Getter
public class MovieSearchDto {
    String keyword;
    int page;
    int size;
    /*
        review 갯수 정렬
        평균평점 높은순 정렬
        연도별 정렬
     */
}
