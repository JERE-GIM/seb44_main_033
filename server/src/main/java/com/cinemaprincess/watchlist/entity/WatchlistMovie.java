package com.cinemaprincess.watchlist.entity;

import com.cinemaprincess.audit.Auditable;
import com.cinemaprincess.movie.entity.Movie;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class WatchlistMovie extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long watchlistMovieId;

    @ManyToOne
    @JoinColumn(name = "watchlistId")
    private Watchlist watchlist;

    @ManyToOne
    @JoinColumn(name = "movieId")
    private Movie movie;
}
