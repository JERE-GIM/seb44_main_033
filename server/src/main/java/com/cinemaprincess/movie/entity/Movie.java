package com.cinemaprincess.movie.entity;

import com.cinemaprincess.review.entity.Review;
import com.cinemaprincess.watchlist.entity.WatchlistMovie;
import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(indexes = {
        @Index(name = "idx_title", columnList = "title"),
        @Index(name = "idx_releaseDate", columnList = "releaseDate")
})
public class Movie {
    @Id
    @Column(name = "movie_id")
    private long movieId;
    private float voteAverage;
    private String title;
    private String posterPath;
    private String releaseDate;

    @OneToOne(mappedBy = "movie", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private MovieDetail movieDetail;
    @OneToMany(mappedBy = "movie")
    private List<WatchlistMovie> watchlistMovies = new ArrayList<>();

    public void setMovieDetail(MovieDetail movieDetail) {
        this.movieDetail = movieDetail;
        if (movieDetail.getMovie() != this) {
            movieDetail.setMovie(this);
        }
    }
    @OneToMany(mappedBy = "movie")
    private List<Review> reviews;

}
