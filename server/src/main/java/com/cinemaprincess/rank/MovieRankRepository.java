package com.cinemaprincess.rank;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRankRepository extends JpaRepository<MovieRank, Long> {
}
