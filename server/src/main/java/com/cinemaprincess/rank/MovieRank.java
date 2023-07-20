package com.cinemaprincess.rank;

import com.cinemaprincess.movie.entity.Movie;
import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Data
@Entity
public class MovieRank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "daily_movie_id")
    private Long id;

//    private String boxofficeType;
//    private String showRange;  //박스오피스 조회 일자
    private String rank;
    private String movieNm;
    private String openDt;
    private String audiAcc;
    private String posterPath;
//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "title",referencedColumnName = "title")
//    private Movie movie;

}
