package com.cinemaprincess.review.entity;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewId;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private int score;
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();
    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;
//    public long getUserId(){
//        return user.getUserId();
//    }

    @ManyToOne
    @JoinColumn(name = "ID")
    private Movie movie;
    public long getId(){
        return movie.getMovieId();
    }
}
