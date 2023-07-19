package com.cinemaprincess.movie.entity;

import com.cinemaprincess.movie.watch_provider.WatchProvider;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class MovieDetailWatchProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long movieDetailWatchProviderId;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private WatchProvider watchProvider;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private MovieDetail movieDetail;
}
