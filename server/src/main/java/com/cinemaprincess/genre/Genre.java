package com.cinemaprincess.genre;

import com.cinemaprincess.movie.entity.MovieDetailGenre;
import com.cinemaprincess.user.entity.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.OneToMany;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;

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

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

}
