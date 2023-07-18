package com.cinemaprincess.movie.vote;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieVoteRepository extends JpaRepository<MovieVote, Long> {
    List<Long> findByIdIn(List<Long> movieIds);
}
