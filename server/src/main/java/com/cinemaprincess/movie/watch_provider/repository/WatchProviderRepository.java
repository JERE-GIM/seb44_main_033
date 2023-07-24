package com.cinemaprincess.movie.watch_provider.repository;

import com.cinemaprincess.movie.watch_provider.entity.WatchProvider;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchProviderRepository extends JpaRepository<WatchProvider, Long> {
}
