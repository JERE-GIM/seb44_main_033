package com.cinemaprincess.movie.vote;

import com.cinemaprincess.movie.entity.MovieDetail;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class MovieVote {
    @Id
    @Column(name = "movie_id")
    private long id;

    @OneToOne
    @PrimaryKeyJoinColumn
    @JoinColumn(name = "movie_id")
    private MovieDetail movieDetail;

    private float voteAverage;
    private int voteCount;
}
