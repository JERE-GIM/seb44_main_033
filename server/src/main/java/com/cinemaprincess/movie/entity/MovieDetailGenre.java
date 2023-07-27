package com.cinemaprincess.movie.entity;

import com.cinemaprincess.genre.entity.Genre;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"movie_id", "genre_id"})) // 고유 제약 조건 설정
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

    @Override
    public String toString() {
        return "MovieDetailGenre{" +
                "movieDetailGenreId=" + movieDetailGenreId +
                ", genre=" + genre +
                ", movieDetail=" + movieDetail +
                '}';
    }
}
