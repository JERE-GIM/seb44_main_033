package com.cinemaprincess.movie.watch_provider;

import com.cinemaprincess.movie.entity.MovieDetailWatchProvider;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@Entity
public class WatchProvider {
    @Id
    private long providerId;
    private String providerName;
    private String logoPath;

    @OneToMany(mappedBy = "watchProvider")
    private List<MovieDetailWatchProvider> movieDetailWatchProviders;
}
