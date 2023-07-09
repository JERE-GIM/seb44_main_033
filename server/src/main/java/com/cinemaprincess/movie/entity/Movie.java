package com.cinemaprincess.movie.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(indexes = {
        @Index(name = "idx_title", columnList = "title"),
        @Index(name = "idx_releaseDate", columnList = "releaseDate")
})
public class Movie {
    @Id
    private long movieId;
    private String originalTitle;
    private String title;
    private String posterPath;
    private String releaseDate;

    @OneToOne(mappedBy = "movie")
    private MovieDetail movieDetail;
}
