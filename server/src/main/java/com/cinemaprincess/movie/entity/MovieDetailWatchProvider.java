package com.cinemaprincess.movie.entity;

import com.cinemaprincess.movie.watch_provider.entity.WatchProvider;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"movie_id", "provider_id"})) // 고유 제약 조건 설정
public class MovieDetailWatchProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long movieDetailWatchProviderId;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private WatchProvider watchProvider;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private MovieDetail movieDetail;
}
