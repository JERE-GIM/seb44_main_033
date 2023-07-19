//package com.cinemaprincess.movie.save;
//
//import com.cinemaprincess.movie.entity.Movie;
//import com.cinemaprincess.movie.entity.MovieDetail;
//import com.cinemaprincess.movie.entity.MovieDetailGenre;
//import com.cinemaprincess.movie.repository.MovieJdbcRepository;
//import com.cinemaprincess.movie.vote.MovieVote;
//import com.cinemaprincess.movie.vote.MovieVoteRepository;
//import com.cinemaprincess.movie.vote.SaveMovieVote;
//import com.cinemaprincess.review.entity.Review;
//import com.cinemaprincess.review.repository.ReviewRepository;
//import com.google.gson.JsonArray;
//import com.google.gson.JsonElement;
//import com.google.gson.JsonObject;
//import com.google.gson.JsonParser;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.web.reactive.function.client.WebClient;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import javax.transaction.Transactional;
//import java.time.LocalDate;
//import java.time.format.DateTimeFormatter;
//import java.util.*;
//import java.util.concurrent.CompletableFuture;
//import java.util.concurrent.ExecutorService;
//import java.util.concurrent.Executors;
//import java.util.stream.Collectors;
//import java.util.stream.IntStream;
//import java.util.stream.StreamSupport;
//
//@Component
//@RequiredArgsConstructor
//@Slf4j
//@Transactional
//public class SaveLatestMovie {
//    private final MovieJdbcRepository movieJdbcRepository;
//    private final SaveMovieDetail saveMovieDetail;
//    private final SaveMovieVote saveMovieVote;
//    private final MovieVoteRepository movieVoteRepository;
//    private final ReviewRepository reviewRepository;
//
//    String key = "8799558ac2f2609cd5ff89aa63a87f10";
//    RestTemplate restTemplate = new RestTemplate();
//    LinkedHashMap<String, String> dateMap = new LinkedHashMap<>();
//
//    public String buildLatestMovieUrl(String startDate, String endDate, int page) {
//        return UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/discover/movie")
//                .queryParam("api_key", key)
//                .queryParam("primary_release_date.gte", startDate)
//                .queryParam("primary_release_date.lte", endDate)
//                .queryParam("language", "ko")
//                .queryParam("page", page)
//                .build()
//                .toUriString();
//    }
//
//    // 멀티스레딩으로 DB에 저장
//    public void getMovieList() {
//        try {
//            ExecutorService executorService = Executors.newFixedThreadPool(30); // 적절한 스레드 풀 크기 선택
//
//            List<CompletableFuture<List<Movie>>> futures = dateMap.entrySet().stream()
//                    .flatMap(entry -> {
//                        String startDate = entry.getKey();
//                        String endDate = entry.getValue();
//                        int pages = getPages(startDate, endDate);
//
//                        return IntStream.rangeClosed(1, pages)
//                                .mapToObj(i -> CompletableFuture.supplyAsync(() -> {
//                                    String url = buildLatestMovieUrl(startDate, endDate, i);
//                                    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
//                                    String responseBody = response.getBody();
//                                    return parseMovieList(responseBody);
//                                }, executorService));
//                    })
//                    .collect(Collectors.toList());
//
//            CompletableFuture<List<Movie>> combinedFuture = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
//                    .thenApply(v -> futures.stream()
//                            .map(CompletableFuture::join)
//                            .flatMap(List::stream)
//                            .collect(Collectors.toList()));
//
//            List<Movie> allMovies = combinedFuture.get();
//
//            movieJdbcRepository.saveMovies(allMovies);
//            log.info("Movie 저장 완료");
//            executorService.shutdown();
//
////            List<MovieDetail> movieDetails = new ArrayList<>();
////            log.info("Movie_detail 저장 시작");
////            for (Movie movie : allMovies) {
////                MovieDetail movieDetail = saveMovieDetail.getMovieDetail(movie.getMovieId());
////                movieDetail.setMovie(movie);
////                movieDetails.add(movieDetail);
////            }
////            movieJdbcRepository.saveMovieDetails(movieDetails);
////            log.info("MovieDetail 저장 완료");
////
////            List<MovieVote> movieVotes = new ArrayList<>();
////            List<MovieDetailGenre> movieDetailGenres = new ArrayList<>();
////
////            List<Long> movieIds = movieDetails.stream()
////                    .map(MovieDetail::getId)
////                    .collect(Collectors.toList());
////            List<Long> existingMovieIds = saveMovieVote.getExistingMovieIds(movieIds);
////
////            for (MovieDetail movieDetail : movieDetails) {
////                if (!existingMovieIds.contains(movieDetail.getId())) {
////                    // 존재하지 않는 경우에만 실행
////                    MovieVote movieVote = saveMovieVote.getMovieVote(movieDetail.getId());
////                    movieVote.setMovieDetail(movieDetail);
////                    movieVotes.add(movieVote);
////                }
////                movieDetailGenres.addAll(movieDetail.getMovieDetailGenres());
////            }
////            movieJdbcRepository.saveMovieVote(movieVotes);
////            movieJdbcRepository.saveMovieDetailGenres(movieDetailGenres);
//            ExecutorService executorService2 = Executors.newFixedThreadPool(30);
//
//            List<CompletableFuture<MovieDetail>> detailFutures = allMovies.stream()
//                    .map(movie -> CompletableFuture.supplyAsync(() -> {
//                        MovieDetail movieDetail = saveMovieDetail.getMovieDetail(movie.getMovieId());
//                        movieDetail.setMovie(movie);
//                        return movieDetail;
//                    }, executorService2))
//                    .collect(Collectors.toList());
//
//            CompletableFuture<List<MovieDetail>> movieDetailsFuture = CompletableFuture.allOf(detailFutures.toArray(new CompletableFuture[0]))
//                    .thenApply(v -> detailFutures.stream()
//                            .map(CompletableFuture::join)
//                            .collect(Collectors.toList()));
//
//            List<MovieDetail> movieDetails = movieDetailsFuture.get();
//
//            movieJdbcRepository.saveMovieDetails(movieDetails);
//
//            log.info("MovieDetail 저장 완료");
//            executorService2.shutdown();
//
//            ExecutorService executorService3 = Executors.newFixedThreadPool(30);
//
//            List<Long> movieIds = movieDetails.stream()
//                    .map(MovieDetail::getId)
//                    .collect(Collectors.toList());
//            List<Long> existingMovieIds = saveMovieVote.getExistingMovieIds(movieIds);
//
//            List<CompletableFuture<MovieVote>> voteFutures = movieDetails.stream()
//                    .filter(movieDetail -> !existingMovieIds.contains(movieDetail.getId()))
//                    .map(movieDetail -> CompletableFuture.supplyAsync(() -> {
//                        MovieVote movieVote = saveMovieVote.getMovieVote(movieDetail.getId());
//                        movieVote.setMovieDetail(movieDetail);
//                        return movieVote;
//                    }, executorService3))
//                    .collect(Collectors.toList());
//
//            CompletableFuture<List<MovieVote>> movieVotesFuture = CompletableFuture.allOf(voteFutures.toArray(new CompletableFuture[0]))
//                    .thenApply(v -> voteFutures.stream()
//                            .map(CompletableFuture::join)
//                            .collect(Collectors.toList()));
//
//            List<MovieVote> movieVotes = movieVotesFuture.get();
//
//            movieJdbcRepository.saveMovieVote(movieVotes);
//
//            log.info("MovieVote 저장 완료");
//            executorService3.shutdown();
//
//            ExecutorService executorService4 = Executors.newFixedThreadPool(30);
//
//            List<CompletableFuture<List<MovieDetailGenre>>> movieDetailGenreFutures = movieDetails.stream()
//                    .map(movieDetail -> CompletableFuture.supplyAsync(movieDetail::getMovieDetailGenres, executorService4))
//                    .collect(Collectors.toList());
//
//            CompletableFuture<Void> allMovieDetailGenresFuture = CompletableFuture.allOf(movieDetailGenreFutures.toArray(new CompletableFuture[0]));
//
//            CompletableFuture<List<MovieDetailGenre>> movieDetailGenresFuture = allMovieDetailGenresFuture.thenApply(v ->
//                    movieDetailGenreFutures.stream()
//                            .map(CompletableFuture::join)
//                            .flatMap(List::stream)
//                            .collect(Collectors.toList())
//            );
//
//            List<MovieDetailGenre> movieDetailGenres = movieDetailGenresFuture.get();
//
//            movieJdbcRepository.saveMovieDetailGenres(movieDetailGenres);
//
//            log.info("MovieDetailGenre 저장 완료");
//            executorService4.shutdown();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    // 받아온 Json 객체를 Movie 엔티티로 변환
//    public List<Movie> parseMovieList(String responseBody) {
//        JsonParser jsonParser = new JsonParser();
//        JsonObject jsonObject = jsonParser.parse(responseBody).getAsJsonObject();
//        JsonArray movieList = jsonObject.getAsJsonArray("results");
//
//        return StreamSupport.stream(movieList.spliterator(), false)
//                .map(JsonElement::getAsJsonObject)
//                .filter(contents -> {
//                    String title = contents.get("title").getAsString();
//                    return title.matches("^[a-zA-Z0-9가-힣\\s\\p{Punct}]+$");
//                })
//                .map(contents -> {
//                    String title = contents.get("title").getAsString();
//                    String posterPath = parsePosterPath(contents);
//
//                    return Movie.builder()
//                            .movieId(contents.get("id").getAsLong())
//                            .title(title)
//                            .posterPath(posterPath)
//                            .build();
//
//                })
//                .collect(Collectors.toList());
//    }
//
//    private String parsePosterPath(JsonObject contents) {
//        // 포스터가 없을 경우, null 이 아닌 빈 문자열이 들어감
//        String posterPath = "";
//        if (contents.has("poster_path") && !contents.get("poster_path").isJsonNull()) {
//            posterPath = contents.get("poster_path").getAsString();
//        }
//        return posterPath;
//    }
//
//    // 500p가 될때까지의 기간을 key, value 값으로 저장
//    public void setDateMap() {
//        LocalDate startDate = LocalDate.parse("2023-07-01");
//        LocalDate endDate = LocalDate.parse("2023-08-31");
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//
//        while (startDate.isBefore(endDate.plusDays(1))) {
//            LocalDate nextDate = startDate.plusMonths(6).minusDays(1);
//            if (nextDate.isAfter(endDate)) {
//                nextDate = endDate;
//            }
//
//            String key = startDate.format(formatter);
//            String value = nextDate.format(formatter);
//
//            int pages = getPages(key, value);
//            boolean isDecreasing = false;
//
//            while (pages != 500 && nextDate.isBefore(endDate) && !nextDate.equals(startDate)) {
//                if (pages < 500) {
//                    if (isDecreasing) break;
//                    nextDate = nextDate.plusMonths(6);
//                } else {
//                    isDecreasing = true;
//                    nextDate = nextDate.minusMonths(1);
//                }
//                value = nextDate.format(formatter);
//                pages = getPages(key, value);
//            }
//
//            dateMap.put(key, value);
//
//            startDate = nextDate.plusDays(1);
//            log.info("{}, {}, {}p", key, value, pages);
//            // 500p가 되면 DB에 저장
//            getMovieList();
//        }
//    }
//
//    // 페이지 수 계산
//    public int getPages(String startDate, String endDate) {
//        try {
//            String url = buildLatestMovieUrl(startDate, endDate, 1);
//
//            WebClient webClient = WebClient.create(url);
//
//            String responseBody = webClient.get()
//                    .retrieve()
//                    .bodyToMono(String.class)
//                    .block();
//
//            JsonParser jsonParser = new JsonParser();
//            JsonObject jsonObject = (JsonObject) jsonParser.parse(responseBody);
//
//            return jsonObject.get("total_pages").getAsInt();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return 0;
//    }
//}
