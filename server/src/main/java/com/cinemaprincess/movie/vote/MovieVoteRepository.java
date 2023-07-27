package com.cinemaprincess.movie.vote;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieVoteRepository extends JpaRepository<MovieVote, Long> {
}
