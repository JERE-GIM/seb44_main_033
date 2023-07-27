package com.cinemaprincess.movie.watch_provider.entity;

import com.cinemaprincess.movie.entity.MovieDetailWatchProvider;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
public class WatchProvider {
    @Id
    private long providerId;
    private String providerName;
    private String logoPath;
    private String link;

    @OneToMany(mappedBy = "watchProvider")
    private List<MovieDetailWatchProvider> movieDetailWatchProviders;
}
