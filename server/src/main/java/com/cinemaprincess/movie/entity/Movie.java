package com.cinemaprincess.movie.entity;

import com.cinemaprincess.audit.Auditable;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Movie extends Auditable {
    @Id
    private long id;

    @Column(name = "original_title")
    private String originalTitle;

    private String title;

    @Column(name = "poster_path")
    private String posterPath;

    @Column(name = "release_date")
    private String releaseDate;
}
