//package com.cinemaprincess.movie;
//
//
//import com.cinemaprincess.helper.MovieTestHelper;
//import com.cinemaprincess.movie.entity.Movie;
//import com.cinemaprincess.movie.save.SaveMovieList;
//import com.cinemaprincess.movie.watch_provider.WatchProvider;
//import com.cinemaprincess.movie.watch_provider.WatchProviderRepository;
//import com.cinemaprincess.movie.watch_provider.WatchProviderService;
//import org.hamcrest.Matchers;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//
//import java.util.List;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.*;
//import static org.hamcrest.core.IsEqual.equalTo;
//import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
//
//@SpringBootTest
//public class MovieTest implements MovieTestHelper {
//    @Autowired
//    private SaveMovieList saveMovieList;
//
//    @Autowired
//    private WatchProviderService watchProviderService;
//
//    @Autowired
//    private WatchProviderRepository watchProviderRepository;
//
//    @Test
//    @DisplayName("페이지 수 구하는 메서드 테스트, 응답 요청 시간")
//    public void testGetPagesResponseTime() {
//        // given
//        String startDate = "1950-01-01";
//        String endDate = "2023-12-31";
//        int expectedPages = 32421;
//
//        // when
//        long startTime = System.currentTimeMillis();
//        int actualPages = saveMovieList.getPages(startDate, endDate);
//        long endTime = System.currentTimeMillis();
//        long responseTime = endTime - startTime;
//
//        // then
//        assertThat(actualPages, is(equalTo(expectedPages)));
//        System.out.println(responseTime);
//    }
//
//    @Test
//    @DisplayName("title이 조건에 따라 제대로 걸러지는지 테스트")
//    public void testParseMovieList() {
//        // given
//        ResponseEntity<String> response = restTemplate.exchange(buildMovieListUrl("1950-01-01","1953-01-01",10), HttpMethod.GET, null, String.class);
//        String responseBody = response.getBody();
//
//        // when
//        List<Movie> movies = saveMovieList.parseMovieList(responseBody);
//
//        // then
//        for (Movie movie : movies) {
//            String title = movie.getTitle();
//            assertThat(title, Matchers.matchesPattern("^[a-zA-Z0-9가-힣\\s\\p{Punct}]+$"));
//        }
//    }
//
//    @Test
//    @DisplayName("ott 목록이 잘 저장되는지 테스트")
//    public void testSaveWatchProviders() throws InterruptedException {
//        watchProviderService.getProviderList();
//        List<WatchProvider> watchProviders = watchProviderRepository.findAll();
//
//        assertNotNull(watchProviders);
//    }
//}