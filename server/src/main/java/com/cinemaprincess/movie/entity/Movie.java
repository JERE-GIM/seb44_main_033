package com.cinemaprincess.movie.entity;

import com.cinemaprincess.audit.Auditable;
import lombok.*;

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
    private String originalTitle;
    private String title;
    private String posterPath;
    private String releaseDate;
}
