package com.cinemaprincess.review.entity;

import com.cinemaprincess.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@NoArgsConstructor
public class ReviewVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewVoteId;
    private boolean isReviewVoted;
    @ManyToOne
    @JoinColumn(name = "REVIEW_ID")
    private Review review;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @Builder
    public ReviewVote(boolean isReviewVoted, Review review, User user) {
        this.isReviewVoted = true;
        this.review = review;
        this.user = user;
    }
    public void updateVote(){
        this.isReviewVoted = !isReviewVoted;
    }
}
