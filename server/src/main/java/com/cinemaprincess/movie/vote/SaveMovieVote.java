package com.cinemaprincess.movie.vote;

import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.repository.MovieDetailRepository;
import com.cinemaprincess.movie.save.SaveMovieDetail;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Transactional
public class SaveMovieVote {
    private final SaveMovieDetail saveMovieDetail;
    private final MovieVoteRepository movieVoteRepository;
    private final MovieDetailRepository movieDetailRepository;
    RestTemplate restTemplate = new RestTemplate();

    public MovieVote getMovieVote(long movieId) {
        MovieVote movieVote = new MovieVote();
        try {
            String url = saveMovieDetail.buildMovieDetailUrl(movieId, "ko");
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
            String responseBody = response.getBody();
            JsonParser jsonParser = new JsonParser();
            JsonObject jsonObject = jsonParser.parse(responseBody).getAsJsonObject();

            float voteAverage = Math.round(jsonObject.get("vote_average").getAsFloat() * 10.0f) / 10.0f;

            movieVote = MovieVote.builder()
                    .id(movieId)
                    .voteAverage(voteAverage)
                    .voteCount(jsonObject.get("vote_count").getAsInt())
                    .build();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return movieVote;
    }

    public List<Long> getExistingMovieIds(List<Long> movieIds) {
        // findByIdIn 메소드를 사용하여 존재하는 movieId들을 반환
        return movieVoteRepository.findByIdIn(movieIds);
    }
}
