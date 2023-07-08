package com.cinemaprincess.movie.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(indexes = @Index(name = "idx_title", columnList = "title"))
public class Movie {
    @Id
    private long movieId;
    private String originalTitle;
    private String title;
    private String posterPath;
    private String releaseDate;
}
