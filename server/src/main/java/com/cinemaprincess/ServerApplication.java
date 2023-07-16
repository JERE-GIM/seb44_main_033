package com.cinemaprincess;

import com.cinemaprincess.genre.GenreService;
import com.cinemaprincess.movie.save.SaveMovieList;
import com.cinemaprincess.movie.vote.SaveMovieVote;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.annotation.PostConstruct;

@EnableJpaAuditing
@SpringBootApplication
public class ServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }
}
