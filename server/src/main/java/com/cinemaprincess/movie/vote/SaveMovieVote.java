package com.cinemaprincess.movie.vote;

import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.save.SaveMovieDetail;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;

@Component
@RequiredArgsConstructor
@Transactional
public class SaveMovieVote {
    private final SaveMovieDetail saveMovieDetail;
    private final MovieVoteRepository movieVoteRepository;
    RestTemplate restTemplate = new RestTemplate();

    public void getMovieVote(long movieId) {
        try {
            String url = saveMovieDetail.buildMovieDetailUrl(movieId, "ko");
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
            String responseBody = response.getBody();
            JsonParser jsonParser = new JsonParser();
            JsonObject jsonObject = jsonParser.parse(responseBody).getAsJsonObject();

            float voteAverage = Math.round(jsonObject.get("vote_average").getAsFloat() * 10.0f) / 10.0f;

            MovieDetail movieDetail = saveMovieDetail.getMovieDetail(movieId);
            MovieVote movieVote = MovieVote.builder()
                    .id(movieId)
                    .voteAverage(voteAverage)
                    .voteCount(jsonObject.get("vote_count").getAsInt())
                    .build();

            if(movieDetail.getMovieVote() == null) {
                movieDetail.setMovieVote(movieVote);
            }

            movieVoteRepository.save(movieDetail.getMovieVote());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
