package com.cinemaprincess.movie.service;

import com.cinemaprincess.movie.repository.MovieJdbcRepository;
import com.cinemaprincess.movie.save.SaveMovieList;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

@Service
@Transactional
public class MovieService {
    private final SaveMovieList saveMovieList;
    private final MovieJdbcRepository movieJdbcRepository;

    public MovieService(SaveMovieList saveMovieList, MovieJdbcRepository movieJdbcRepository) {
        this.saveMovieList = saveMovieList;
        this.movieJdbcRepository = movieJdbcRepository;
    }

//    // DB에 한번 저장하면 이 부분 주석 처리
//    @PostConstruct
//    public void initialize() {
//        saveMovieList.setDateMap(movieJdbcRepository);
//    }
}
