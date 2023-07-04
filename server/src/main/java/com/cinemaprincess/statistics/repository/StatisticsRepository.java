package com.cinemaprincess.statistics.repository;

import com.cinemaprincess.statistics.entity.Statistics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatisticsRepository extends JpaRepository<Statistics, Long> {

}
