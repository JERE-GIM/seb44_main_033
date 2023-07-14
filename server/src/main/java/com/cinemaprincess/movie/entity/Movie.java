package com.cinemaprincess.movie.entity;

import com.cinemaprincess.review.entity.Review;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import javax.persistence.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(indexes = {
        @Index(name = "idx_releaseDate_title", columnList = "title")
})
public class Movie {
    @Id
    private Long movieId;

    private String title;

    private String posterPath;

    private float voteAverage;

    private float popularity;

    @OneToOne(mappedBy = "movie", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private MovieDetail movieDetail;

    public void setMovieDetail(MovieDetail movieDetail) {
        this.movieDetail = movieDetail;
        if (movieDetail.getMovie() != this) {
            movieDetail.setMovie(this);
        }
    }
}
