package com.cinemaprincess.movie.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class MovieDetail {
    @Id
    @Column(name = "movie_id")
    private long movieId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "movie_id")
    private Movie movie;

    private String backdropPath;
    private String overview;
    private Integer runtime;
    private String tagline;
}
