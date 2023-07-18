package com.cinemaprincess.watchlist.repository;

import com.cinemaprincess.watchlist.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {
    Watchlist findByWatchlistId(Long watchlistId);
}
