package com.cinemaprincess.watchlist.entity;

import com.cinemaprincess.audit.Auditable;
import com.cinemaprincess.user.entity.User;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.OneToMany;
import javax.persistence.JoinColumn;
import javax.persistence.CascadeType;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Watchlist extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long watchlistId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private int count;

    @OneToMany(mappedBy = "watchlist", cascade = CascadeType.REMOVE)
    private List<WatchlistMovie> watchlistMovies = new ArrayList<>();
}
