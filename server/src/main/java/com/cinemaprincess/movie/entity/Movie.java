package com.cinemaprincess.movie.entity;

import com.cinemaprincess.watchlist.entity.WatchlistMovie;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
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
public class Movie implements Serializable {
    @Id
    private long movieId;

    private String title;

    private String posterPath;

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
//    @OneToMany(mappedBy = "movie",cascade = CascadeType.ALL)
//    private List<MovieRank> movieRanks = new ArrayList<>();
}
