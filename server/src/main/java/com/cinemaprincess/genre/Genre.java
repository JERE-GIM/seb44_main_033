package com.cinemaprincess.genre;

import com.cinemaprincess.movie.entity.MovieDetailGenre;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.OneToMany;
import javax.persistence.Entity;
import javax.persistence.Id;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Genre {
    @Id
    private long genreId;
    private String genreName;

    @OneToMany(mappedBy = "genre")
    private List<MovieDetailGenre> movieDetailGenres;
}
