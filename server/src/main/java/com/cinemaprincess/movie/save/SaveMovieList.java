package com.cinemaprincess.movie.save;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.repository.MovieJdbcRepository;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
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

import javax.transaction.Transactional;
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
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SaveMovieList {
    private final MovieJdbcRepository movieJdbcRepository;
    private final SaveMovieDetail saveMovieDetail;

    RestTemplate restTemplate = new RestTemplate();
    LinkedHashMap<String, String> dateMap = new LinkedHashMap<>();

    // api url
    public String buildMovieListUrl(String startDate, String endDate, int page) {
        String key = "8799558ac2f2609cd5ff89aa63a87f10";
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
            log.info("Movie 저장 완료");

            List<MovieDetail> movieDetails = new ArrayList<>();
            log.info("Movie_detail 저장 시작");
            for (Movie movie : allMovies) {
                MovieDetail movieDetail = saveMovieDetail.getMovieDetail(movie.getMovieId());
                movieDetails.add(movieDetail);
            }
            movieJdbcRepository.saveMovieDetails(movieDetails);

//            for (MovieDetail movieDetail : movieDetails) {
//                movieJdbcRepository.saveMovieDetailGenres(movieDetail.getMovieDetailGenres());
//                movieJdbcRepository.saveMovieDetailWatchProviders(movieDetail.getMovieDetailWatchProviders());
//            }

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

    // 받아온 Json 객체를 Movie 엔티티로 변환
    public List<Movie> parseMovieList(String responseBody) {
        JsonParser jsonParser = new JsonParser();
        JsonObject jsonObject = jsonParser.parse(responseBody).getAsJsonObject();
        JsonArray movieList = jsonObject.getAsJsonArray("results");

        // ObjectMapper 객체 생성
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS,false);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);

        return StreamSupport.stream(movieList.spliterator(), false)
                .map(JsonElement::getAsJsonObject)
                .filter(contents -> {
                    String title = contents.get("title").getAsString();
                    return title.matches("^[a-zA-Z0-9가-힣\\s\\p{Punct}]+$");
                })
                .map(contents -> {
                    // JSON 객체를 Movie 엔티티로 변환
                    Movie movie = objectMapper.convertValue(contents, Movie.class);
                    // posterPath를 별도로 파싱
                    String posterPath = parsePosterPath(contents);
                    // posterPath를 Movie 엔티티에 설정
                    movie.setPosterPath(posterPath);
                    long movieId = contents.get("id").getAsLong();
                    String releaseDate = contents.get("release_date").getAsString();
                    movie.setReleaseDate(releaseDate);
                    movie.setMovieId(movieId);
                    return movie;
                })
                .collect(Collectors.toList());
    }

    private String parsePosterPath(JsonObject contents) {
        // 포스터가 없을 경우, null 이 아닌 빈 문자열이 들어감
        String posterPath = "";
        if (contents.has("poster_path") && !contents.get("poster_path").isJsonNull()) {
            posterPath = contents.get("poster_path").getAsString();
        }
        return posterPath;
    }

    // 500p가 될때까지의 기간을 key, value 값으로 저장
    public void setDateMap() {
        LocalDate startDate = LocalDate.parse("2023-06-13");
        LocalDate endDate = LocalDate.parse("2023-08-13");
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
            log.info("{}, {}, {}p", key, value, pages);
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
