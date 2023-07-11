package com.cinemaprincess.movie.save;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.repository.MovieJdbcRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
@RequiredArgsConstructor
@Slf4j
public class SaveMovieList {
    String key = "8799558ac2f2609cd5ff89aa63a87f10";
    private final MovieJdbcRepository movieJdbcRepository;
    private final SaveMovieDetail saveMovieDetail;

    RestTemplate restTemplate = new RestTemplate();
    LinkedHashMap<String, String> dateMap = new LinkedHashMap<>();

    @PostConstruct
    public void initialize() {
        setDateMap();
    }

    // api url
    public String buildMovieListUrl(String startDate, String endDate, int page) {
        return UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/discover/movie")
                .queryParam("api_key", key)
                .queryParam("primary_release_date.gte", startDate)
                .queryParam("primary_release_date.lte", endDate)
                .queryParam("language", "ko")
                .queryParam("page", page)
                .build()
                .toUriString();
    }

    // 멀티스레딩으로 DB에 저장
    public void getMovieList() {
        try {
            ExecutorService executorService = Executors.newFixedThreadPool(30); // 적절한 스레드 풀 크기 선택

            List<CompletableFuture<List<Movie>>> futures = dateMap.entrySet().stream()
                    .flatMap(entry -> {
                        String startDate = entry.getKey();
                        String endDate = entry.getValue();
                        int pages = getPages(startDate, endDate);

                        return IntStream.rangeClosed(1, pages)
                                .mapToObj(i -> CompletableFuture.supplyAsync(() -> {
                                    String url = buildMovieListUrl(startDate, endDate, i);
                                    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
                                    String responseBody = response.getBody();
                                    return parseMovieList(responseBody);
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

/*            List<CompletableFuture<MovieDetail>> detailFutures = allMovies.stream()
                    .map(movie -> CompletableFuture.supplyAsync(() -> {
                        MovieDetail movieDetail = saveMovieDetail.getMovieDetail(movie.getMovieId());
                        movieDetail.setMovie(movie);
                        return movieDetail;
                    }, executorService))
                    .collect(Collectors.toList());

            CompletableFuture<List<MovieDetail>> movieDetailsFuture = CompletableFuture.allOf(detailFutures.toArray(new CompletableFuture[0]))
                    .thenApply(v -> detailFutures.stream()
                            .map(CompletableFuture::join)
                            .collect(Collectors.toList()));

            List<MovieDetail> movieDetails = movieDetailsFuture.get();

            movieJdbcRepository.saveMovieDetails(movieDetails);
            log.info("=========================Movie_detail 저장 완료=========================");*/
            executorService.shutdown();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 받아온 Json 객체를 Movie 엔티티로 변환
    public List<Movie> parseMovieList(String responseBody) {
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
                    .voteAverage(contents.get("vote_average").getAsFloat())
                    .releaseDate(contents.get("release_date").getAsString())
                    .title(title)
                    .posterPath(posterPath)
                    .build();

            movies.add(movie);
        }

        return movies;
    }

    // 500p가 될때까지의 기간을 key, value 값으로 저장
    public void setDateMap() {
        LocalDate startDate = LocalDate.parse("2019-05-30");
        LocalDate endDate = LocalDate.parse("2019-05-30");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        while (startDate.isBefore(endDate.plusDays(1))) {
            LocalDate nextDate = startDate.plusMonths(6).minusDays(1);
            if (nextDate.isAfter(endDate)) {
                nextDate = endDate;
            }

            String key = startDate.format(formatter);
            String value = nextDate.format(formatter);

            int pages = getPages(key, value);
            boolean isDecreasing = false;

            while (pages != 500 && nextDate.isBefore(endDate) && !nextDate.equals(startDate)) {
                if (pages < 500) {
                    if (isDecreasing) break;
                    nextDate = nextDate.plusMonths(6);
                } else {
                    isDecreasing = true;
                    nextDate = nextDate.minusMonths(1);
                }
                value = nextDate.format(formatter);
                pages = getPages(key, value);
            }

            dateMap.put(key, value);

            startDate = nextDate.plusDays(1);
            System.out.printf("%s, %s, %dp%n", key, value, pages);
            // 500p가 되면 DB에 저장
            getMovieList();
        }
    }

    // 페이지 수 계산
    public int getPages(String startDate, String endDate) {
        try {
            String url = buildMovieListUrl(startDate, endDate, 1);

            WebClient webClient = WebClient.create(url);

            String responseBody = webClient.get()
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonParser jsonParser = new JsonParser();
            JsonObject jsonObject = (JsonObject) jsonParser.parse(responseBody);

            return jsonObject.get("total_pages").getAsInt();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }
}
