package com.cinemaprincess.review.entity;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewId;
    private String movieTitle;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private int score;
    @Column(nullable = false)
    private int votesCount;
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();
    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;
    public long getUserId(){
        return user.getUserId();
    }

//    @ManyToOne(cascade = CascadeType.ALL)
    @ManyToOne
    @JoinColumn(name = "MOVIE_ID")
    private MovieDetail movieDetail;
    public long getMovieId(){
        return movieDetail.getId();
    }

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL)
    private List<ReviewVote> reviewVote;

    public void updateVoteCount(boolean voted){
        if(voted){
            votesCount++;
        } else {
            votesCount--;
        }
    }
}
