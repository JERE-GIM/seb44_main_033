package com.cinemaprincess.movie.vote;

import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.entity.MovieDetailCache;
import com.cinemaprincess.movie.repository.MovieJdbcRepository;
import com.cinemaprincess.movie.save.SaveMovieDetail;
import com.cinemaprincess.utils.RestTemplateConfig;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
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
    private final RestTemplateConfig restTemplateConfig;

    public void getMovieVote() {
        ExecutorService executorService = Executors.newFixedThreadPool(30);
        try {
            List<MovieDetail> movieDetails = movieDetailCache.getMovieDetails();

            List<CompletableFuture<MovieVote>> voteFutures = movieDetails.stream()
                    .map(movieDetail -> CompletableFuture.supplyAsync(() -> {
                        String url = saveMovieDetail.buildMovieDetailUrl(movieDetail.getId());
                        ResponseEntity<String> response = restTemplateConfig.restTemplate().exchange(url, HttpMethod.GET, null, String.class);
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
                    }, executorService))
                    .collect(Collectors.toList());

            CompletableFuture<List<MovieVote>> movieVotesFuture = CompletableFuture.allOf(voteFutures.toArray(new CompletableFuture[0]))
                    .thenApply(v -> voteFutures.stream()
                            .map(CompletableFuture::join)
                            .collect(Collectors.toList()));

            List<MovieVote> movieVotes = movieVotesFuture.get();

            movieJdbcRepository.saveMovieVote(movieVotes);

            log.info("MovieVote 저장 완료");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            executorService.shutdown();
        }
    }
}