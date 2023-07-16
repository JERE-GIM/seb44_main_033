package com.cinemaprincess.movie.entity;

import com.cinemaprincess.genre.Genre;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class MovieDetailGenre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long movieDetailGenreId;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private MovieDetail movieDetail;
}
