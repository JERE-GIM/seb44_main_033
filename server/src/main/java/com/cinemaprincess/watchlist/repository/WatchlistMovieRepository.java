package com.cinemaprincess.watchlist.repository;

import com.cinemaprincess.watchlist.entity.WatchlistMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchlistMovieRepository extends JpaRepository<WatchlistMovie, Long> {
    WatchlistMovie findByWatchlistWatchlistIdAndMovieMovieId(Long watchlistId, Long movieId);
    WatchlistMovie findByMovieMovieId(Long movieId);
}
