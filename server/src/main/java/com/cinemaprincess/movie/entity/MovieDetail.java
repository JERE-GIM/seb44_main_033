package com.cinemaprincess.movie.entity;

import com.cinemaprincess.movie.vote.MovieVote;
import com.cinemaprincess.review.entity.Review;
import lombok.*;
import org.springframework.data.domain.Page;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class MovieDetail {
    @Id
    @Column(name = "movie_id")
    private Long id;

    private String backdropPath;

    @Column(length = 1000)
    private String overview;

    private int runtime;

    private String certification;

    private String director;

    private String actors;

    private String videoPath;

    private String releaseDate;

    @OneToOne
    @PrimaryKeyJoinColumn
    @JoinColumn(name = "movie_id")
    private Movie movie;

    public void setMovie(Movie movie) {
        this.movie = movie;
        if (movie.getMovieDetail() != this) {
            movie.setMovieDetail(this);
        }
    }

    @OneToMany(mappedBy = "movieDetail")
    private List<MovieDetailGenre> movieDetailGenres;

    @OneToMany(mappedBy = "movieDetail")
    private List<MovieDetailWatchProvider> movieDetailWatchProviders;

    @OneToMany(mappedBy = "movieDetail", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToOne(mappedBy = "movieDetail", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private MovieVote movieVote;
}
