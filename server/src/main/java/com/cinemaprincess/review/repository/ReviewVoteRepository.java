package com.cinemaprincess.review.repository;

import com.cinemaprincess.review.entity.Review;
import com.cinemaprincess.review.entity.ReviewVote;
import com.cinemaprincess.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewVoteRepository extends JpaRepository<ReviewVote, Long> {
    Optional<ReviewVote> findByReviewAndUser(Review review, User user);
}
