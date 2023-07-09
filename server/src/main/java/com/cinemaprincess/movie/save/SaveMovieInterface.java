package com.cinemaprincess.movie.save;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.repository.MovieJdbcRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

// 전략 패턴
public interface SaveMovieInterface {
    String key = "8799558ac2f2609cd5ff89aa63a87f10";

    RestTemplate restTemplate = new RestTemplate();
    HttpHeaders httpHeaders = new HttpHeaders();
    HttpEntity<?> entity = new HttpEntity<>(httpHeaders);
    LinkedHashMap<String, String> dateMap = new LinkedHashMap<>();

    // api url
    String buildMovieListUrl(String startDate, String endDate, int page);

    // 멀티스레딩으로 DB에 저장
    default void getMovieList(MovieJdbcRepository movieJdbcRepository) {
        try {
            ExecutorService executorService = Executors.newFixedThreadPool(35); // 적절한 스레드 풀 크기 선택

            List<CompletableFuture<List<Movie>>> futures = new ArrayList<>();

            for (Map.Entry<String, String> entry : dateMap.entrySet()) {
                String startDate = entry.getKey();
                String endDate = entry.getValue();
                int pages = getPages(startDate, endDate);

                for (int i = 1; i <= pages; i++) {
                    int page = i;
                    CompletableFuture<List<Movie>> future = CompletableFuture.supplyAsync(() -> {
                        String url = buildMovieListUrl(startDate, endDate, page);
                        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
                        String responseBody = response.getBody();
                        return parseMovieList(responseBody);
                    }, executorService);
                    futures.add(future);
                }
            }

            CompletableFuture<Void> allFutures = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]));
            CompletableFuture<List<Movie>> combinedFuture = allFutures.thenApply(v -> futures.stream()
                    .map(CompletableFuture::join)
                    .flatMap(List::stream)
                    .collect(Collectors.toList()));

            List<Movie> allMovies = combinedFuture.get();

            int batchSize = 10000; // 배치 사이즈 설정
            for (int i = 0; i < allMovies.size(); i += batchSize) {
                List<Movie> batchMovies = allMovies.subList(i, Math.min(i + batchSize, allMovies.size()));
                movieJdbcRepository.saveMovies(batchMovies);
            }

            executorService.shutdown();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 받아온 Json 객체를 Movie 엔티티로 변환
    default List<Movie> parseMovieList(String responseBody) {
        JsonParser jsonParser = new JsonParser();
        JsonObject jsonObject = jsonParser.parse(responseBody).getAsJsonObject();
        JsonArray movieList = jsonObject.getAsJsonArray("results");
        List<Movie> movies = new ArrayList<>();

        for (JsonElement jsonElement : movieList) {
            JsonObject contents = jsonElement.getAsJsonObject();

            // 포스터가 없을 경우, null 이 아닌 빈 문자열이 들어감
            String posterPath = "";
            if (contents.has("poster_path") && !contents.get("poster_path").isJsonNull()) {
                posterPath = contents.get("poster_path").getAsString();
            }

            String title = contents.get("title").getAsString();

            // title 이 한글, 영어, 숫자, 공백, 특수문자만으로 이루어진 영화만 저장
            if (!title.matches("^[a-zA-Z0-9가-힣\\s\\p{Punct}]+$")) {
                continue; // 조건에 맞지 않는 title 은 건너뜀
            }

            Movie movie = Movie.builder()
                    .movieId(contents.get("id").getAsLong())
                    .originalTitle(contents.get("original_title").getAsString())
                    .releaseDate(contents.get("release_date").getAsString())
                    .title(title)
                    .posterPath(posterPath)
                    .build();

            movies.add(movie);
        }

        return movies;
    }

    // 500p가 될때까지의 기간을 key, value 값으로 저장
    default void setDateMap(MovieJdbcRepository movieJdbcRepository) {
        LocalDate startDate = LocalDate.parse("1950-01-01");
        LocalDate endDate = LocalDate.parse("2023-12-31");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        while (startDate.isBefore(endDate.plusDays(1))) {
            LocalDate nextDate = startDate.plusMonths(6).minusDays(1);
            if (nextDate.isAfter(endDate)) {
                nextDate = endDate;
            }

            String key = startDate.format(formatter);
            String value = nextDate.format(formatter);

            int pages = getPages(key, value);
            while (pages < 500 && nextDate.isBefore(endDate)) {
                nextDate = nextDate.plusMonths(6);
                value = nextDate.format(formatter);
                pages = getPages(key, value);
            }

            if (pages > 500) {
                while (pages > 500 && !nextDate.equals(startDate)) {
                    nextDate = nextDate.minusMonths(1);
                    value = nextDate.format(formatter);
                    pages = getPages(key, value);
                }
            }

            dateMap.put(key, value);

            startDate = nextDate.plusDays(1);
            System.out.printf("%s, %s, %dp%n", key, value, pages);
            // 500p가 되면 DB에 저장
            if(dateMap.size() == 1) {
                getMovieList(movieJdbcRepository);
                dateMap.clear();
            }
        }
    }

    // 페이지 수 계산
    default int getPages(String startDate, String endDate) {
        try {
            String url = buildMovieListUrl(startDate, endDate, 1);

            UriComponents uri = UriComponentsBuilder.fromHttpUrl(url).build();

            ResponseEntity<String> response = restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, String.class);
            String responseBody = response.getBody();

            JsonParser jsonParser = new JsonParser();
            JsonObject jsonObject = (JsonObject) jsonParser.parse(responseBody);

            return jsonObject.get("total_pages").getAsInt();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return 0;
    }
}
