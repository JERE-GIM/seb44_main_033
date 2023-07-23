package com.cinemaprincess.search;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class SearchTest {

    private final MovieRepository movieRepository;

    public SearchTest(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Test
    @DisplayName("N+1 Test")
    void test1(){
        String keyword = "Love";
        int page = 1;
        int size = 10;

        List<Movie> movies = new ArrayList<>();

        for(int i = 0; i < 10; i++){
            Movie movie = Movie.builder().movieId(i)
                    .title("영화"+ i)
                    .build();
            movies.add(movie);
        }

        movieRepository.saveAll(movies);

        System.out.println("------------------");



    }

}
