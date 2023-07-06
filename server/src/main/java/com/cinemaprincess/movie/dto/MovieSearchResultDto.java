package com.cinemaprincess.movie.dto;

import com.cinemaprincess.movie.entity.Movie;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovieSearchResultDto {
    private String title;

    public MovieSearchResultDto(Movie movie) {
        this.title = movie.getTitle();
    }

}
