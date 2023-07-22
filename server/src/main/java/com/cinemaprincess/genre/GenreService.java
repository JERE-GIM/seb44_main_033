package com.cinemaprincess.genre;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.repository.MovieRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
@EnableScheduling
public class GenreService {
    String key = "8799558ac2f2609cd5ff89aa63a87f10";
    private final GenreRepository genreRepository;
    private final MovieRepository movieRepository;
    private final GenreCache genreCache;
    RestTemplate restTemplate = new RestTemplate();

    public String buildGenreListUrl() {
        return UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/genre/movie/list")
                .queryParam("api_key", key)
                .queryParam("language", "ko")
                .build()
                .toUriString();
    }

    public void getGenreList() {
        try {
            String url = buildGenreListUrl();
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
            String responseBody = response.getBody();
            List<Genre> genres = parseGenreList(responseBody);

            // 장르를 캐시에 추가
            for (Genre genre : genres) {
                genreCache.addGenre(genre);
            }

            genreRepository.saveAll(genres);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Genre> parseGenreList(String responseBody) {
        JsonParser jsonParser = new JsonParser();
        JsonObject jsonObject = jsonParser.parse(responseBody).getAsJsonObject();
        JsonArray genreArray = jsonObject.getAsJsonArray("genres");

        List<Genre> genres = new ArrayList<>();
        for (JsonElement element : genreArray) {
            JsonObject genreObject = element.getAsJsonObject();
            Genre genre = new Genre();
            genre.setGenreId(genreObject.get("id").getAsLong());
            genre.setGenreName(genreObject.get("name").getAsString());

            genres.add(genre);
        }

        return genres;
    }

    @Cacheable(cacheNames = "genresByYear", key = "#year")
    public Map<String, Long> getGenresByYear(int year) {
        List<Movie> movies = movieRepository.getMoviesByYear(year);
        return movies.stream()
                .flatMap(movie -> movie.getMovieDetail().getMovieDetailGenres().stream())
                .map(movieDetailGenre -> movieDetailGenre.getGenre().getGenreName())
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
    }
    /*
        매달 1일 캐시 삭제
     */
    @Scheduled(cron = "0 0 0 1 * ?")
    @CacheEvict(cacheNames = "genresByYear", allEntries = true)
    public void evictCache() {}
}
