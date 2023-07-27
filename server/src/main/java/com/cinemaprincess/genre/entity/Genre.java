package com.cinemaprincess.genre.entity;

import com.cinemaprincess.movie.entity.MovieDetailGenre;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
public class Genre {
    @Id
    private long genreId;
    private String genreName;

    @OneToMany(mappedBy = "genre")
    private List<MovieDetailGenre> movieDetailGenres;
}
