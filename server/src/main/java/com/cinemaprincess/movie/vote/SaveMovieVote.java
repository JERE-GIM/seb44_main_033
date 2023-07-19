package com.cinemaprincess.movie.vote;

import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.entity.MovieDetailCache;
import com.cinemaprincess.movie.repository.MovieJdbcRepository;
import com.cinemaprincess.movie.save.SaveMovieDetail;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Transactional
@Slf4j
public class SaveMovieVote {
    private final SaveMovieDetail saveMovieDetail;
    private final MovieDetailCache movieDetailCache;
    private final MovieJdbcRepository movieJdbcRepository;
    private final MovieVoteRepository movieVoteRepository;
    RestTemplate restTemplate = new RestTemplate();

    public void getMovieVote() {
        ExecutorService executorService = Executors.newFixedThreadPool(20);
        List<MovieDetail> movieDetails = movieDetailCache.getMovieDetails();
        List<CompletableFuture<MovieVote>> futures = new ArrayList<>();

        for (MovieDetail movieDetail : movieDetails) {
            CompletableFuture<MovieVote> future = CompletableFuture.supplyAsync(() -> {
                try {
                    String url = saveMovieDetail.buildMovieDetailUrl(movieDetail.getId());
                    ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
                    String responseBody = response.getBody();
                    JsonParser jsonParser = new JsonParser();
                    JsonObject jsonObject = jsonParser.parse(responseBody).getAsJsonObject();

                    float voteAverage = Math.round(jsonObject.get("vote_average").getAsFloat() * 10.0f) / 10.0f;

                    return MovieVote.builder()
                            .id(movieDetail.getId())
                            .voteAverage(voteAverage)
                            .voteCount(jsonObject.get("vote_count").getAsInt())
                            .movieDetail(movieDetail)
                            .build();
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }
            }, executorService);

            futures.add(future);
        }

        CompletableFuture<Void> allFutures = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]));

        CompletableFuture<List<MovieVote>> combinedFuture = allFutures.thenApply(v ->
                futures.stream()
                        .map(CompletableFuture::join)
                        .collect(Collectors.toList())
        );

        try {
            List<MovieVote> movieVotes = combinedFuture.get();
            movieJdbcRepository.saveMovieVote(movieVotes);
            log.info("MovieVote 저장 완료");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return movieVote;
    }

    public List<Long> getExistingMovieIds(List<Long> movieIds) {
        // findByIdIn 메소드를 사용하여 존재하는 movieId들을 반환
        return movieVoteRepository.findByIdIn(movieIds);

        executorService.shutdown();
    }
}
