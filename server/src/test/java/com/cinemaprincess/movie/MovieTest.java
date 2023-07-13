package com.cinemaprincess.movie;


import com.cinemaprincess.helper.MovieTestHelper;
import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.repository.MovieJdbcRepository;
import com.cinemaprincess.movie.save.SaveMovieDetail;
import com.cinemaprincess.movie.save.SaveMovieList;
import lombok.extern.slf4j.Slf4j;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.core.IsEqual.equalTo;

@Slf4j
@SpringBootTest
public class MovieTest implements MovieTestHelper {
    @Autowired
    private SaveMovieList saveMovieList;

    @Autowired
    private SaveMovieDetail saveMovieDetail;

    @Autowired
    private MovieJdbcRepository movieJdbcRepository;

    @Test
    @DisplayName("페이지 수 구하는 메서드 테스트, 응답 요청 시간")
    public void testGetPagesResponseTime() {
        // given
        String startDate = "1950-01-01";
        String endDate = "2023-12-31";
        int expectedPages = 32421;

        // when
        long startTime = System.currentTimeMillis();
        int actualPages = saveMovieList.getPages(startDate, endDate);
        long endTime = System.currentTimeMillis();
        long responseTime = endTime - startTime;

        // then
        assertThat(actualPages, is(equalTo(expectedPages)));
        System.out.println(responseTime);
    }

    @Test
    @DisplayName("title이 조건에 따라 제대로 걸러지는지 테스트")
    public void testParseMovieList() {
        // given
        ResponseEntity<String> response = restTemplate.exchange(buildMovieListUrl("1950-01-01", "1953-01-01", 10), HttpMethod.GET, null, String.class);
        String responseBody = response.getBody();

        // when
        List<Movie> movies = saveMovieList.parseMovieList(responseBody);

        // then
        for (Movie movie : movies) {
            String title = movie.getTitle();
            assertThat(title, Matchers.matchesPattern("^[a-zA-Z0-9가-힣\\s\\p{Punct}]+$"));
        }
    }

    @Test
    @DisplayName("db 저장 속도 비교(save)")
    public void testDBSaveSpeed() {
        try {
            ExecutorService executorService = Executors.newFixedThreadPool(30); // 적절한 스레드 풀 크기 선택

            List<CompletableFuture<List<Movie>>> futures = dateMap.entrySet().stream()
                    .flatMap(entry -> {
                        String startDate = entry.getKey();
                        String endDate = entry.getValue();
                        int pages = saveMovieList.getPages(startDate, endDate);

                        return IntStream.rangeClosed(1, pages)
                                .mapToObj(i -> CompletableFuture.supplyAsync(() -> {
                                    String url = buildMovieListUrl(startDate, endDate, i);
                                    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
                                    String responseBody = response.getBody();
                                    return saveMovieList.parseMovieList(responseBody);
                                }, executorService));
                    })
                    .collect(Collectors.toList());

            CompletableFuture<List<Movie>> combinedFuture = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                    .thenApply(v -> futures.stream()
                            .map(CompletableFuture::join)
                            .flatMap(List::stream)
                            .collect(Collectors.toList()));

            List<Movie> allMovies = combinedFuture.get();

            movieJdbcRepository.saveMovies(allMovies); // DB에 저장
            log.info("Movie 저장 완료");

            log.info("Movie_detail 저장 시작");
            for (Movie movie : allMovies) {
                saveMovieDetail.getMovieDetail(movie.getMovieId());
            }
//            List<CompletableFuture<MovieDetail>> detailFutures = allMovies.stream()
//                    .map(movie -> CompletableFuture.supplyAsync(() -> {
//                        MovieDetail movieDetail = saveMovieDetail.getMovieDetail(movie.getMovieId());
//                        movieDetail.setMovie(movie);
//                        return movieDetail;
//                    }, executorService))
//                    .collect(Collectors.toList());
//            log.info("detailFutures 리스트 완료");
//            CompletableFuture<List<MovieDetail>> movieDetailsFuture = CompletableFuture.allOf(detailFutures.toArray(new CompletableFuture[0]))
//                    .thenApply(v -> detailFutures.stream()
//                            .map(CompletableFuture::join)
//                            .collect(Collectors.toList()));
//            log.info("movieDetailsFuture 리스트 완료");
//            List<MovieDetail> movieDetails = movieDetailsFuture.get();
//            log.info("MovieDetails 리스트 완료");
//            movieJdbcRepository.saveMovieDetails(movieDetails);
            log.info("Movie_detail 저장 완료");
            executorService.shutdown();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
