package com.cinemaprincess.movie.save;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.entity.MovieDetailGenre;
import com.cinemaprincess.movie.entity.MovieDetailWatchProvider;
import com.cinemaprincess.movie.repository.MovieJdbcRepository;
import com.cinemaprincess.movie.vote.MovieVote;
import com.cinemaprincess.utils.RestTemplateConfig;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
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
    private final RestTemplateConfig restTemplateConfig;

    @Value("${tmdb.key}")
    String key;
    LinkedHashMap<String, String> dateMap = new LinkedHashMap<>();

    public String buildMovieListUrl(String startDate, String endDate, int page) {
        return UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/discover/movie")
                .queryParam("api_key", key)
                .queryParam("primary_release_date.gte", startDate)
                .queryParam("primary_release_date.lte", endDate)
                .queryParam("language", "ko")
                .queryParam("vote_count.gte", 10)
                .queryParam("page", page)
                .build()
                .toUriString();
    }

    // 멀티스레딩으로 DB에 저장
    public List<Movie> getMovieList() {
        ExecutorService executorService = Executors.newFixedThreadPool(30);

        List<Movie> allMovies = new ArrayList<>();
        try {
            List<CompletableFuture<List<Movie>>> futures = dateMap.entrySet().stream()
                    .flatMap(entry -> {
                        String startDate = entry.getKey();
                        String endDate = entry.getValue();
                        int pages = getPages(startDate, endDate);

                        return IntStream.rangeClosed(1, pages)
                                .mapToObj(i -> CompletableFuture.supplyAsync(() -> {
                                    String url = buildMovieListUrl(startDate, endDate, i);
                                    return parseMovieList(restTemplateConfig.restTemplate(url));
                                }, executorService));
                    })
                    .collect(Collectors.toList());

            CompletableFuture<List<Movie>> combinedFuture = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                    .thenApply(v -> futures.stream()
                            .map(CompletableFuture::join)
                            .flatMap(List::stream)
                            .collect(Collectors.toList()));

            allMovies = combinedFuture.get();

            movieJdbcRepository.saveMovies(allMovies);
            log.info("Movie 저장 완료");

            return allMovies;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            executorService.shutdown();
        }

        return allMovies;
    }

    public List<MovieDetail> saveMovieDetails() {
        ExecutorService executorService = Executors.newFixedThreadPool(30);

        List<Movie> allMovies = this.getMovieList();
        List<MovieDetail> movieDetails = new ArrayList<>();
        try {
            List<CompletableFuture<MovieDetail>> detailFutures = allMovies.stream()
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

            movieDetails = movieDetailsFuture.get();

            movieJdbcRepository.saveMovieDetails(movieDetails);

            log.info("MovieDetail 저장 완료");

            return movieDetails;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            executorService.shutdown();
        }

        return movieDetails;
    }

    public void saveMovieVoteAndGenreAndProvider() {
        ExecutorService executorService = Executors.newFixedThreadPool(30);

        List<MovieDetail> movieDetails = this.saveMovieDetails();
        try {
            List<CompletableFuture<MovieVote>> voteFutures = movieDetails.stream()
                    .map(movieDetail -> CompletableFuture.supplyAsync(movieDetail::getMovieVote, executorService))
                    .collect(Collectors.toList());

            CompletableFuture<List<MovieVote>> movieVotesFuture = CompletableFuture.allOf(voteFutures.toArray(new CompletableFuture[0]))
                    .thenApply(v -> voteFutures.stream()
                            .map(CompletableFuture::join)
                            .collect(Collectors.toList()));

            List<MovieVote> movieVotes = movieVotesFuture.get();

            movieJdbcRepository.saveMovieVote(movieVotes);

            log.info("MovieVote 저장 완료");

            List<CompletableFuture<List<MovieDetailGenre>>> movieDetailGenreFutures = movieDetails.stream()
                    .map(movieDetail -> CompletableFuture.supplyAsync(movieDetail::getMovieDetailGenres, executorService))
                    .collect(Collectors.toList());

            CompletableFuture<Void> allMovieDetailGenresFuture = CompletableFuture.allOf(movieDetailGenreFutures.toArray(new CompletableFuture[0]));

            CompletableFuture<List<MovieDetailGenre>> movieDetailGenresFuture = allMovieDetailGenresFuture.thenApply(v ->
                    movieDetailGenreFutures.stream()
                            .map(CompletableFuture::join)
                            .flatMap(List::stream)
                            .collect(Collectors.toList())
            );

            List<MovieDetailGenre> movieDetailGenres = movieDetailGenresFuture.get();

            movieJdbcRepository.saveMovieDetailGenres(movieDetailGenres);

            log.info("MovieDetailGenre 저장 완료");

            List<CompletableFuture<List<MovieDetailWatchProvider>>> movieDetailProviderFutures = movieDetails.stream()
                    .map(movieDetail -> CompletableFuture.supplyAsync(movieDetail::getMovieDetailWatchProviders, executorService))
                    .collect(Collectors.toList());

            CompletableFuture<Void> allMovieDetailProvidersFuture = CompletableFuture.allOf(movieDetailProviderFutures.toArray(new CompletableFuture[0]));

            CompletableFuture<List<MovieDetailWatchProvider>> movieDetailProvidersFuture = allMovieDetailProvidersFuture.thenApply(v ->
                    movieDetailProviderFutures.stream()
                            .map(CompletableFuture::join)
                            .flatMap(List::stream)
                            .collect(Collectors.toList())
            );

            List<MovieDetailWatchProvider> movieDetailWatchProviders = movieDetailProvidersFuture.get();

            movieJdbcRepository.saveMovieDetailWatchProviders(movieDetailWatchProviders);

            log.info("MovieDetailProviders 저장 완료");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            executorService.shutdown();
        }
    }

    // 받아온 Json 객체를 Movie 엔티티로 변환
    public List<Movie> parseMovieList(String responseBody) {
        JsonParser jsonParser = new JsonParser();
        JsonObject jsonObject = jsonParser.parse(responseBody).getAsJsonObject();
        JsonArray movieList = jsonObject.getAsJsonArray("results");

        return StreamSupport.stream(movieList.spliterator(), false)
                .map(JsonElement::getAsJsonObject)
                .filter(contents -> {
                    String title = contents.get("title").getAsString();
                    return title.matches("^[a-zA-Z0-9가-힣\\s\\p{Punct}]+$");
                })
                .map(contents -> {
                    String title = contents.get("title").getAsString();
                    String posterPath = parsePosterPath(contents);

                    return Movie.builder()
                            .movieId(contents.get("id").getAsLong())
                            .title(title)
                            .posterPath(posterPath)
                            .build();

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
    public void setDateMap(String start, String end) {
        LocalDate startDate = LocalDate.parse(start);
        LocalDate endDate = LocalDate.parse(end);
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
                    if (nextDate.isAfter(endDate)) {
                        nextDate = endDate;
                    }
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
            this.saveMovieVoteAndGenreAndProvider();
            dateMap.clear();
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